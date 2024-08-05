import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { JwtAccessTokenGuard } from './guard/jwt-access-token.guard';
import { JwtRefreshTokenGuard } from './guard/jwt-refresh-token.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // access token 검증 메서드
  @UseGuards(JwtAccessTokenGuard)
  @Get('test')
  test() {
    return 'success';
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // access, refresh token 발급
    const tokenData = await this.authService.login(loginDto);

    // 쿠키에 토큰 저장
    res.setHeader('Authorization', 'Bearer ' + Object.values(tokenData));
    res.cookie('access_token', tokenData.accessToken, { httpOnly: true });
    res.cookie('refresh_token', tokenData.refreshToken, { httpOnly: true });

    return tokenData;
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh')
  async refresh(
    @Body() req: RefreshTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId: number = req.userId;
    const refreshToken = req.refreshToken;

    // 새로운 access token 발급
    const tokenData = await this.authService.refresh(userId, refreshToken);

    // 쿠키의 access token 교체
    res.setHeader('Authorization', 'Bearer ' + tokenData.accessToken);
    res.cookie('access_token', tokenData.accessToken, { httpOnly: true });

    return tokenData;
  }

  @UseGuards(JwtAccessTokenGuard)
  @UseGuards(JwtRefreshTokenGuard)
  @Post('logout')
  async logout(@Req() req: any, @Res() res: Response) {
    await this.authService.logout(req.user.id);

    // 쿠키 토큰 삭제
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.send('success');
  }
}

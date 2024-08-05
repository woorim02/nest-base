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
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // access token 검증 메서드
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAccessTokenGuard)
  @Get('test')
  test(@Req() req: any) {
    return req.user;
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

  @ApiHeader({
    name: 'x-refresh-token',
    description: 'Refresh token',
    required: true,
  })
  @UseGuards(JwtRefreshTokenGuard)
  @Post('refresh')
  async refresh(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.headers['x-refresh-token'].replace('Bearer ', '');

    // 새로운 access token 발급
    const tokenData = await this.authService.refresh(req.user.id, refreshToken);

    // 쿠키의 access token 교체
    res.setHeader('Authorization', 'Bearer ' + tokenData.accessToken);
    res.cookie('access_token', tokenData.accessToken, { httpOnly: true });

    return tokenData;
  }

  @ApiHeader({
    name: 'x-refresh-token',
    description: 'Refresh token',
    required: true,
  })
  @UseGuards(JwtRefreshTokenGuard)
  @Post('logout')
  async logout(@Req() req: any, @Res() res: Response) {
    await this.authService.logout(req.user.id);
    return res.send('success');
  }
}

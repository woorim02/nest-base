import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { RefreshTokenPayload } from '../refresh-token-payload';
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh_token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      // body에서 refreshToken 가져옴
      jwtFromRequest: ExtractJwt.fromHeader('x-refresh-token'),
      secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: RefreshTokenPayload) {
    const refreshToken = req.headers['x-refresh-token'];

    if (!refreshToken || typeof refreshToken !== 'string') {
      throw new UnauthorizedException('Invalid or missing refresh token');
    }

    // 저장된 refresh token과 비교
    const result = await this.authService.compareUserRefreshToken(
      payload.id,
      refreshToken,
    );
    // 결과가 틀렸다면 예외 발생
    if (!result) {
      throw new UnauthorizedException('refresh token is wrong');
    }
    req.user = payload;

    return payload;
  }
}

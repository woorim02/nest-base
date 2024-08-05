import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    ConfigModule,
    UsersModule,  // UsersModule을 임포트하여 UsersService를 사용 가능하도록 함
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
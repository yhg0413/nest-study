import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/auth.local.strategy';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/auth.jwt.strategy';

@Module({
  imports: [PassportModule,JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {expiresIn: '60s',}
  }),TypeOrmModule.forFeature([User])],
  providers: [AuthService, LocalStrategy,JwtStrategy],
})
export class AuthModule {}
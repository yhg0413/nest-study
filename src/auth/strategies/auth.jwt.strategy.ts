import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      //Request에서 JWT 토큰을 추출하는 방법을 설정 -> Authorization에서 Bearer Token에 JWT 토큰을 담아 전송해야한다.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //true로 설정하면 Passport에 토큰 검증을 위임하지 않고 직접 검증, false는 Passport에 검증 위임
      ignoreExpiration: false,
      //검증 비밀 값(유출 주위)
      secretOrKey: jwtConstants.secret,
    });
    /*옵션들
      export interface StrategyOptions {
      secretOrKey?: string | Buffer | undefined;
      secretOrKeyProvider?: SecretOrKeyProvider | undefined;
      jwtFromRequest: JwtFromRequestFunction;
      issuer?: string | undefined;
      audience?: string | undefined;
      algorithms?: string[] | undefined;
      ignoreExpiration?: boolean | undefined;
      passReqToCallback?: boolean | undefined;
      jsonWebTokenOptions?: VerifyOptions | undefined;
    */
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
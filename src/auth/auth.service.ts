import { Injectable,ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly jwtService: JwtService,
      ) {}

  async validateUser(user_id: string, password: string): Promise<any> {
    console.log('AuthService');

    const user = await this.userRepository.findOneBy({"user_id":user_id});
    //사용자가 요청한 비밀번호와 DB에서 조회한 비밀번호 일치여부 검사
    if (user && user.password === password) {
        const { password, ...result } = user;
        
        const accessToken = await this.jwtService.sign(result);

        result['token'] = accessToken;
        //비밀번호를 제외하고 유저 정보를 반환
        return result;
    }
    throw new ForbiddenException('아이디와 비밀번호를 다시 확인해주세요')
  }
}
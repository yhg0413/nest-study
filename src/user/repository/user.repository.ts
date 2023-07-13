import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { DeleteResult, Repository } from "typeorm";
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from "../dto/user.dto";

// user.repository.ts
@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    
    async create(createUserDto: CreateUserDto):Promise<boolean>{
        const user = await this.userRepository.create({
            ...createUserDto,
            'salt':'test'
        })
        if(user){user.save()}
        return user ? true : false
    }

    async findOneByUserId(userId: string): Promise<User> {
        return await this.userRepository
            .createQueryBuilder('u')
            .where('u.id = :userId', { userId: userId })
            .getOne();
    }

    async findAll(): Promise<User []> {
        return await this.userRepository.find();
    }

    async delete(id: string): Promise<DeleteResult>{
        return await this.userRepository.delete({'id':id})
    }
}

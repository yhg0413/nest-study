import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/user.dto';
import { UserRepository } from './repository/user.repository';
import { uploadFileURL } from 'src/multer/multer.options';
import { extname } from 'path';
import * as fs from 'fs'
@Injectable()
export class UserService {
    constructor(
        private usersRepository: UserRepository,
      ) {}

    getHelloWorld(): string{
        return 'Hello World';
    }

    async onCreateUser(createUserDto: CreateUserDto):Promise<boolean>{
        console.log('tes')
        const result = this.usersRepository.create({
            ...createUserDto,
        })
        return result;
    }

    async getUserAll(): Promise<User[]> {
        console.log(await this.usersRepository.findAll())
        return await this.usersRepository.findAll();
    }

    async findByUserOne(id: string): Promise<User>{
        console.log(id)
        console.log(await this.usersRepository.findOneByUserId(id))
        return this.usersRepository.findOneByUserId(id);
    }

    async setUser(id:string, name:string):Promise<User> {
        const user = await this.usersRepository.findOneByUserId(id)
        user.name = name
        return user.save();
    }

    async deleteUser(id: string): Promise<DeleteResult> {
        return await this.usersRepository.delete(id)
    }

    uploadFileDisk(files: File[]): string[] {
        return files.map((file:any) => {
            console.log(file.filename)
            return uploadFileURL(file.filename)
        })
    }

    uploadFileDiskDestination(user_id: string, files: File[]): string[] {
        //유저별 폴더 생성
        const uploadFilePath = `uploads/${user_id}`;
    
        if (!fs.existsSync(uploadFilePath)) {
          // uploads 폴더가 존재하지 않을시, 생성합니다.
          fs.mkdirSync(uploadFilePath);
        }
        return files.map((file: any) => {
          //파일 이름
          const fileName = Date.now() + extname(file.originalname);
          //파일 업로드 경로
          const uploadPath =
            __dirname + `/../../${uploadFilePath + '/' + fileName}`;
    
          //파일 생성
          fs.writeFileSync(uploadPath, file.path); // file.path 임시 파일 저장소
    
          return uploadFileURL(uploadFilePath + '/' + fileName);
        });
      }
      uploadFileMemory(user_id: string, files: File[]): any {
        //유저별 폴더 생성
        const uploadFilePath = `uploads/${user_id}`;
    
        if (!fs.existsSync(uploadFilePath)) {
          // uploads 폴더가 존재하지 않을시, 생성합니다.
          fs.mkdirSync(uploadFilePath);
        }
    
        return files.map((file: any) => {
          //파일 이름
          const fileName = Date.now() + extname(file.originalname);
          //파일 업로드 경로
          const uploadPath =
            __dirname + `/../../${uploadFilePath + '/' + fileName}`;
    
          //파일 생성
          fs.writeFileSync(uploadPath, file.buffer);
    
          //업로드 경로 반환
          return uploadFileURL(uploadFilePath + '/' + fileName);
        });
      }
}

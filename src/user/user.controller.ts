import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
    UsePipes,
    ParseIntPipe,
    ValidationPipe,
    DefaultValuePipe,
    UseGuards,
    Request,
    UseInterceptors,
    UploadedFiles,
    Bind,
    Res,
    HttpStatus
  } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { DeleteResult } from 'typeorm';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor,
         FilesInterceptor,
         } from '@nestjs/platform-express';
import { multerDiskDestinationOutOption, multerDiskOptions, multerMemoryOptions } from 'src/multer/multer.options';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @UseGuards(LocalAuthGuard)
    @Post('/auth/login')
    async login(@Request() req){
        console.log(('Login Route'))

        return req.user;
    }

    @Get()
    getHelloWorld(): string{
        return this.userService.getHelloWorld();
    }
    /*
    유저 생성
    */
    @Post('/create_user')
    @UsePipes(ValidationPipe)
    async onCreateUser(@Body() createUserDto: CreateUserDto):Promise<boolean>{
        console.log(createUserDto)
        return this.userService.onCreateUser(createUserDto)
    }

    /*
    전체 조회
    */
    @UseGuards(JwtAuthGuard)
    @Get('/user_all')
    async getUserAll(): Promise<User[]> {
        return this.userService.getUserAll();
    }

    /*
    단일 조회 (쿼리 이용)
    */
    @Get('/user')
    async findByUserOne1(@Query('id') id: string): Promise<User>{
        return this.userService.findByUserOne(id);
    }

    /*
    유저 생성 (파라미터 이용)
    */
    @Get('/user/:id')
    async findByUserOne2(@Param('id') id: string): Promise<User>{
        return this.userService.findByUserOne(id);
    }

    /*
     단일 수정
    */
    @Patch('/user/:id')
    async setUser(@Param('id') id:string, @Body('name') name: string): Promise<User>{
        return this.userService.setUser(id, name);
    }


    /*
    유저 삭제
    */
    @Delete('/user/delete')
    async deleteUser(@Query('id') id: string): Promise<DeleteResult> {
        console.log('test')
        return this.userService.deleteUser(id);
    }
    
    @Post('/disk_upload1')
    @UseInterceptors(FilesInterceptor('files',null, multerDiskOptions))
    @Bind(UploadedFiles())
    uploadFileDisk(files: File[], @Res() res: Response){
        res.status(HttpStatus.OK).json({
            success: true,
            data: this.userService.uploadFileDisk(files),
          });
    }

    @Post('/disk_upload2')
    @UseInterceptors(
      FilesInterceptor('files', null, multerDiskDestinationOutOption),
    )
    @Bind(UploadedFiles())
    uploadFileDiskDestination(
      files: File[],
      @Body('id') id: string,
      @Res() res: Response,
    ) {
      if (id != undefined) {
        res.status(HttpStatus.OK).json({
            success: true,
            data: this.userService.uploadFileDiskDestination(id, files),
          });
      }else{
        res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            data: null
          });
      }
    }
    @Post('/memory_upload')
    @UseInterceptors(FilesInterceptor('files', null, multerMemoryOptions))
    @Bind(UploadedFiles())
    uploadFileMemory(
        files: File[],
        @Body('id') id: string,
        @Res() res: Response,
    ) {
        if (id != undefined) {
        res.status(HttpStatus.OK).json({
            success: true,
            data: this.userService.uploadFileDiskDestination(id, files),
            });
        }else{
        res.status(HttpStatus.BAD_REQUEST).json({
            success: false,
            data: null
            });
        }
    }

}

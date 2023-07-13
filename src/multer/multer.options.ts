import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';


export const multerDiskOptions = {
    fileFilter: (request, file, callback) => {
        if(file.mimetype.match(/\/(jpg|jpeg|png|)$/)){
            //이미지 형식 jpg, jpen, png만 허용
            callback(null, true);
        }else{
            callback(
                new HttpException(
                    {
                        message: 1,
                        error: '지원하지 않느 이미지 형식입니다.'
                    },
                    HttpStatus.BAD_REQUEST
                ),
                false
            )
        }
    },
    storage: diskStorage({
        destination: (request, file, callback) => {
            const uploadPath = 'uploads';
            if(!existsSync(uploadPath)){
                mkdirSync(uploadPath)
            }
            callback(null,uploadPath);
        },
        filename: (request,file,callback) =>{
            console.log(file)
            callback(null, `${Date.now()}${extname(file.originalname)}`);
        },
    }),
    limits: {
        fieldNameSize: 200, // 핗드명 사이즈 최대값 (기본 100bytes)
        filedSize: 1024 * 1024, //필드 사이즈 값 기본 1MB
        fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 무제한)
        fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" 기본 무제한
        files: 10, //파일 최대 개수
    }
}

export const multerDiskDestinationOutOption = {
    fileFilter: (request,file,callback) => {
        if(file.mimetype.match(/\/(jpg|jpeg|png)$/)){
            callback(null, true)
        }else{
            callback(
                new HttpException(
                    {
                        message: 1,
                        error: '지원하지 않는 이미지 형식입니다.',
                    },
                    HttpStatus.BAD_REQUEST,
                ),
                false
            )
        };
    },
    storage: diskStorage({
        filename: (request, file, callback) => {
            callback(null, `${Date.now()}${extname(file.originalname)}`);
        },
    }),
    limits: {
        fileNameSize: 200,
        filedSize: 1024 * 1024,
        fields: 2,
        fileSize: 167787216,
        files: 10,
    },
};

export const multerMemoryOptions = {
    fileFilter: (request,file, callback) => {
        console.log('multerMemoryOptions: fileFilter');
        if(file.mimetype.match(/\/(jpg|jpeg|png)$/)){
            callback(null,true);
        }else{
            callback(
                new HttpException(
                    {
                        message: 1,
                        error: '지원하지 않는 이미지 형식 입니다.',
                    },
                    HttpStatus.BAD_REQUEST,
                ),
                false
            );
        }
    },
    stroage: memoryStorage(),
    limits:{
        fileNameSize: 200,
        filedSize: 1024 * 1024,
        fields: 2,
        fileSize: 167787216,
        files: 10,
    },
};


export const uploadFileURL = (fileName): string => {
    console.log(fileName)
    return `http://localhost:3000/${fileName}`
} ;
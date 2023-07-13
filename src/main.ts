import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
      whitelist: DTO에 없는 속성은 무조건 거른다.
      forbidNonWhitelisted: 전달하는 요청 값 중에 정의 되지 않은 값이 있으면 Error를 발생합니다.
      transform: 네트워크를 통해 들어오는 데이터는 일반 JavaScript 객체입니다.
                 객체를 자동으로 DTO로 변환을 원하면 transform 값을 true로 설정한다.
                 ex) id 값을 입력받으면 String 형태인데 숫자로 받을경우 number 형태로 변환한다.
      disableErrorMessages: Error가 발생 했을 때 Error Message를 표시 여부 설정(true: 표시하지 않음, false: 표시함)
                            배포(서비스) 환경에서는 true로 설정하기
  */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
    })
  )
  await app.listen(3000);
}
bootstrap();

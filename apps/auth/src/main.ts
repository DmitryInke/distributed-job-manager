require('module-alias/register');
import { NestFactory } from '@nestjs/core';
import { AUTH_PACKAGE_NAME } from '@distributed-job-manager/grpc';
import { AppModule } from './app/app.module';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { init } from '@distributed-job-manager/nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await init(app);
  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, '../../libs/grpc/proto/auth.proto'),
    },
  });
  await app.startAllMicroservices();
}

bootstrap();

import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@distributed-job-manager/nestjs';

@Module({
  imports: [LoggerModule, JobsModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}

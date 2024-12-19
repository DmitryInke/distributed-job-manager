import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [ConfigModule, JobsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

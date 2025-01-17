import { Module } from '@nestjs/common';
import { FibonacciJob } from './jobs/fibonacci/fibonacci.job';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobsService } from './jobs.service';
import { JobsResolver } from './jobs.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Packages } from '@distributed-job-manager/grpc';
import { join } from 'path';
import { PulsarModule } from '@distributed-job-manager/pulsar';
import { ConfigService } from '@nestjs/config';
import { LoadProductsJob } from './jobs/products/load-produtcs.job';
@Module({
  imports: [
    DiscoveryModule,
    ClientsModule.registerAsync([
      {
        name: Packages.AUTH,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.getOrThrow('AUTH_GRPC_SERVICE_URL'),
            package: Packages.AUTH,
            protoPath: join(__dirname, '../../libs/grpc/proto/auth.proto'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    PulsarModule,
  ],
  providers: [FibonacciJob, JobsService, JobsResolver, LoadProductsJob],
})
export class JobsModule {}

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  FibonacciMessage,
  PulsarClient,
} from '@distributed-job-manager/pulsar';
import { iterate } from 'fibonacci';
import { Jobs } from '@distributed-job-manager/nestjs';
import { JobConsumer } from '../job.consumer';
import { ClientGrpc } from '@nestjs/microservices';
import { Packages } from '@distributed-job-manager/grpc';

@Injectable()
export class FibonacciConsumer
  extends JobConsumer<FibonacciMessage>
  implements OnModuleInit
{
  constructor(
    pulsarClient: PulsarClient,
    @Inject(Packages.JOBS) clientJobs: ClientGrpc
  ) {
    super(Jobs.FIBONACCI, pulsarClient, clientJobs);
  }

  protected async execute(data: FibonacciMessage): Promise<void> {
    const result = iterate(data.iterations);
    this.logger.log(result);
  }
}

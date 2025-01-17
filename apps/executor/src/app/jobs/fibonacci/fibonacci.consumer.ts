import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  FibonacciMessage,
  PulsarClient,
  PulsarConsumer,
} from '@distributed-job-manager/pulsar';
import { iterate } from 'fibonacci';
import { Jobs } from '@distributed-job-manager/nestjs';

@Injectable()
export class FibonacciConsumer
  extends PulsarConsumer<FibonacciMessage>
  implements OnModuleInit
{
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient, Jobs.FIBONACCI);
  }

  protected async onMessage(data: FibonacciMessage): Promise<void> {
    const result = iterate(data.iterations);
    this.logger.log(result);
  }
}

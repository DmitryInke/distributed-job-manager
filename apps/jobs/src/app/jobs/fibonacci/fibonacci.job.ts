import {
  FibonacciMessage,
  PulsarClient,
} from '@distributed-job-manager/pulsar';
import { Job } from '../../decorators/job.decorator';
import { AbstractJob } from '../abstract.job';
import { Jobs } from '@distributed-job-manager/nestjs';
import { PrismaService } from '../../prisma/prisma.service';

@Job({
  name: Jobs.FIBONACCI,
  description: 'Generate a Fibonacci sequence and store it in the DB.',
})
export class FibonacciJob extends AbstractJob<FibonacciMessage> {
  protected messageClass = FibonacciMessage;

  constructor(pulsarClient: PulsarClient, prismaService: PrismaService) {
    super(pulsarClient, prismaService);
  }
}

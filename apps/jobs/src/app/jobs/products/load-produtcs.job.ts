import { Jobs } from '@distributed-job-manager/nestjs';
import { Job } from '../../decorators/job.decorator';
import { AbstractJob } from '../abstract.job';
import {
  LoadProductsMessage,
  PulsarClient,
} from '@distributed-job-manager/pulsar';
import { PrismaService } from '../../prisma/prisma.service';

@Job({
  name: Jobs.LOAD_PRODUCTS,
  description: 'Loads uploaded product data into the DB after enrichment.',
})
export class LoadProductsJob extends AbstractJob<LoadProductsMessage> {
  protected messageClass = LoadProductsMessage;

  constructor(pulsarClient: PulsarClient, prismaService: PrismaService) {
    super(pulsarClient, prismaService);
  }
}

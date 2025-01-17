import { Jobs } from '@distributed-job-manager/nestjs';
import { Job } from '../../decorators/job.decorator';
import { AbstractJob } from '../abstract.job';
import {
  LoadProductsMessage,
  PulsarClient,
} from '@distributed-job-manager/pulsar';

@Job({
  name: Jobs.LOAD_PRODUCTS,
  description: 'Loads uploaded product data into the DB after enrichment.',
})
export class LoadProductsJob extends AbstractJob<LoadProductsMessage> {
  protected messageClass = LoadProductsMessage;

  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}

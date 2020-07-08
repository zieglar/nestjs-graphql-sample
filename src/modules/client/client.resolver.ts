import {Args, Query, Resolver,} from '@nestjs/graphql';
import {NotFoundException} from '@nestjs/common';
import {ClientService} from 'src/modules/client/client.service';
import {ofClient, returnClient,} from './models';
import {InjectQueue} from '@nestjs/bull';
import {Queue} from 'bull';

@Resolver(ofClient)
export class ClientResolver {
  constructor(
    private readonly service: ClientService,
    @InjectQueue('client') private readonly clientQueue: Queue,
  ) {
  }

  @Query(returnClient, {name: 'client'})
  async getClientById(@Args('id') id: string) {
    const client = await this.service.findById(id);
    if (!client) {
      throw new NotFoundException(id);
    }
    return client;
  }

  @Query(returnClient, {name: 'clientByIdentity'})
  async getClientByClientIdentity(
    @Args('clientIdentity') clientIdentity: string,
  ) {
    const client = await this.service.findOne({clientIdentity});
    if (!client) {
      throw new NotFoundException(clientIdentity);
    }
    return client;
  }
}

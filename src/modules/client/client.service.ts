import {Injectable} from '@nestjs/common';
import {BaseService} from '@bases/base.service';
import {ClientEntity} from '@entities/client.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class ClientService extends BaseService<ClientEntity> {
  constructor(
    @InjectRepository(ClientEntity)
    readonly repository: Repository<ClientEntity>,
  ) {
    super(repository);
  }
}

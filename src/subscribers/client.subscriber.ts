import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { ClientEntity } from '@entities/client.entity';
import { hmac, randomString } from 'utility';
import * as dayjs from 'dayjs';
import { COMPACT_DATE_TIME_FORMAT } from '@constant';

@EventSubscriber()
export class ClientSubscriber
  implements EntitySubscriberInterface<ClientEntity> {
  listenTo() {
    return ClientEntity;
  }

  async beforeInsert({ entity, manager }: InsertEvent<ClientEntity>) {
    let clientIdentity = '';
    let count = 0;
    do {
      clientIdentity = clientIdentity = randomString(16).toLowerCase();
      count = await manager.count(ClientEntity, { clientIdentity });
    } while (count !== 0);

    const today = dayjs().format(COMPACT_DATE_TIME_FORMAT);
    entity.password = hmac(
      'sha1',
      `rsms@meetutech@${today}`,
      entity.ethMacAddress,
    );
    entity.clientIdentity = clientIdentity;
    entity.clientSecret = hmac(
      'sha1',
      entity.clientIdentity,
      entity.ethMacAddress,
    );
  }
}

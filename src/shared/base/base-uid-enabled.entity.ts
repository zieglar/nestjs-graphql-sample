import { Column } from 'typeorm';
import { BaseUIDEntity } from './base-uid.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { typeBoolean } from 'src/models';

@ObjectType()
export abstract class BaseUIDWithEnabledEntity extends BaseUIDEntity {
  @Field(typeBoolean)
  @Column({ default: true, comment: '是否可用' })
  enabled: boolean;
}

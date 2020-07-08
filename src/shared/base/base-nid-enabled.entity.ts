import { Column } from 'typeorm';
import { BaseNIDEntity } from './base-nid.entity';
import { typeBoolean } from 'src/models';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class BaseNIDWithEnabledEntity extends BaseNIDEntity {
  @Field(typeBoolean)
  @Column({ default: true, comment: '是否可用' })
  enabled: boolean;
}

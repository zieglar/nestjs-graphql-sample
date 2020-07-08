import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { toDateString } from '@utils/to-date-string';
import { typeID, typeString } from 'src/models';

@ObjectType()
export abstract class BaseUIDEntity {
  @Field(typeID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(typeString)
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: toDateString,
  })
  createdAt: string;

  @Field(typeString)
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: toDateString,
  })
  updatedAt: string;
}

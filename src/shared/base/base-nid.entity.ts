import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { toDateString } from '@utils/to-date-string';
import { typeID, typeString } from 'src/models';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class BaseNIDEntity {
  @Field(typeID)
  @PrimaryGeneratedColumn()
  readonly id: number;

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

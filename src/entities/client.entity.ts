import {Column, Entity} from 'typeorm';
import {Field, ObjectType} from '@nestjs/graphql';
import {typeString} from 'src/models';
import {MaxLength, MinLength} from 'class-validator';
import {BaseUIDWithEnabledEntity} from '@bases/base-uid-enabled.entity';

@Entity('client')
@ObjectType()
export class ClientEntity extends BaseUIDWithEnabledEntity {
  @Field(typeString)
  @Column({length: 50, unique: true})
  ethMacAddress: string;

  @Field(typeString)
  @Column({length: 50, default: ''})
  btMacAddress: string;

  @Field(typeString)
  @Column({length: 50, default: ''})
  serverName: string;

  @MinLength(8)
  @MaxLength(100)
  @Field(typeString)
  @Column({length: 50, default: ''})
  serverAddress: string;

  @Field(typeString)
  @Column({length: 100, default: ''})
  clientIdentity: string;

  @Field(typeString)
  @Column({length: 100, default: ''})
  clientSecret: string;

  @Field(typeString)
  @Column({length: 100})
  password: string;

  @Field(typeString)
  name: string;

  constructor(item?: Partial<ClientEntity>) {
    super();
    if (item) Object.assign(this, item);
  }
}

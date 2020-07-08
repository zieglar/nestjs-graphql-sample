import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from 'src/interfaces';

@ObjectType()
export class MessageDTO implements Message {
  @Field({ nullable: true })
  message!: string;
}

import { Field, InputType } from '@nestjs/graphql';
import { typeString } from 'src/models';

@InputType()
export class CreateClientInput {
  @Field(typeString)
  ethMacAddress: string;
}

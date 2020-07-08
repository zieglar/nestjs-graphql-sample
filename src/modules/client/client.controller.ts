import {Controller, Get, Query} from '@nestjs/common';

@Controller('client')
export class ClientController {
  constructor() {
  }

  @Get('/rsmsCallback')
  async rsmsCallback(
    @Query('client') clientIdentity: string,
    @Query('event') event: string,
  ) {
    return {success: true};
  }
}

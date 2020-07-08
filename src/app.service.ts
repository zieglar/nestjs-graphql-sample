import { Injectable } from '@nestjs/common';
import { MessageDTO } from 'src/models';

@Injectable()
export class AppService {
  getData(data?: string): MessageDTO {
    const message = data ? `Hello, ${data}!` : 'Welcome to api!';
    return { message };
  }
}

import { Injectable } from '@nestjs/common';
import {
  DNSHealthIndicator,
  MemoryHealthIndicator,
  TerminusEndpoint,
  TerminusModuleOptions,
  TerminusOptionsFactory,
} from '@nestjs/terminus';

@Injectable()
export class TerminusConfig implements TerminusOptionsFactory {
  constructor(
    private readonly dns: DNSHealthIndicator,
    private readonly mem: MemoryHealthIndicator,
  ) {}

  createTerminusOptions(): TerminusModuleOptions {
    const healthEndpoint: TerminusEndpoint = {
      url: '/health',
      healthIndicators: [
        async () => this.dns.pingCheck('web', 'https://baidu.com'),
        async () => this.mem.checkHeap('mem', 150 * 1024 * 1024),
      ],
    };
    return {
      endpoints: [healthEndpoint],
    };
  }
}

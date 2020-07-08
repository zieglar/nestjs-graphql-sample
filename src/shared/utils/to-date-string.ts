import { FindOperator, ValueTransformer } from 'typeorm';
import * as dayjs from 'dayjs';

export const toDateString: ValueTransformer = {
  from(value: Date): string {
    if (value) {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  to(value: any) {
    if (value) {
      switch (typeof value) {
        case 'string':
          return dayjs(value).toDate();
        case 'object':
          if (value instanceof FindOperator) {
            if (value.value instanceof Date) {
              (value as any)._value = value.value;
            }
          }
          return value;
      }
    }
  },
};

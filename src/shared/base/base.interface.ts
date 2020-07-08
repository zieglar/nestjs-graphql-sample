import {
  DeleteResult,
  FindConditions,
  FindManyOptions,
  UpdateResult,
} from 'typeorm';

export interface IBaseService<T> {
  find: (f: FindManyOptions<T> & FindConditions<T>) => Promise<T[]>;
  findById: (i: string | number) => Promise<T>;
  findAndCount: (
    filter: FindManyOptions<T>,
    page: number,
    perPage: number,
  ) => Promise<IFindAndCountResult<T>>;
  create: (i: any) => Promise<T>;
  update: (id: string | number, i: any) => Promise<UpdateResult>;
  delete: (i: string | number) => Promise<DeleteResult>;
  count: () => Promise<number>;
}


export interface IFindAndCountResult<T> {
  data: Partial<T>[];
  count: number;
  total: number;
}

export interface IBaseServiceCache {
  find: boolean;
  findById: boolean;
  findOne: boolean;
  findAndCount: boolean;
}

export interface IBaseServiceOptions {
  cache?: IBaseServiceCache | boolean;
}

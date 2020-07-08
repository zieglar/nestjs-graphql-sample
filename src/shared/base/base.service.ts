import {
  DeleteResult,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';

import {
  IBaseService,
  IBaseServiceCache,
  IBaseServiceOptions,
  IFindAndCountResult,
} from './base.interface';

export abstract class BaseService<T> implements IBaseService<T> {
  private cache: IBaseServiceCache;
  protected readonly repository: Repository<T>;

  protected constructor(
    repository: Repository<T>,
    options: IBaseServiceOptions = {},
  ) {
    this.repository = repository;

    this.cacheConfig(options.cache);
  }

  public async find(filter: FindManyOptions<T> = {}): Promise<T[]> {
    return this.repository.find({ ...filter, cache: this.cache.find });
  }

  public async findById(id: string | number): Promise<T> {
    return this.repository.findOne(id, { cache: this.cache.findById });
  }

  public async findOne(
    conditions: FindConditions<T>,
    options: FindOneOptions<T> = {},
  ): Promise<T> {
    return this.repository.findOne(conditions, {
      ...options,
      cache: this.cache.findOne,
    });
  }

  public async findAndCount(
    filter: FindManyOptions<T>,
    page: number = 1,
    perPage: number = 30,
  ): Promise<IFindAndCountResult<T>> {
    const skip = perPage * (page - 1);

    const [result, total] = await this.repository.findAndCount({
      ...filter,
      cache: this.cache.findAndCount,
      take: perPage,
      skip,
    });

    return {
      data: result,
      count: result.length,
      total,
    };
  }

  public async save(item: any): Promise<T> {
    return this.repository.save(item);
  }

  // item param type should be type T but there is an issue with third party library.
  public async create(item: any): Promise<T> {
    return this.repository.save(item);
  }

  // item param type should be type T but there is an issue with third party library.
  public async update(id: string | number, item: any): Promise<UpdateResult> {
    return this.repository.update(id, item);
  }

  public async delete(id: string | number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  public async count(options: FindManyOptions<T> = {}): Promise<number> {
    return this.repository.count(options);
  }

  private cacheConfig(cache: IBaseServiceCache | boolean): void {
    if (!cache) {
      this.cache = {
        find: false,
        findById: false,
        findOne: false,
        findAndCount: false,
      };
    }

    if (cache === true) {
      this.cache = {
        find: true,
        findById: true,
        findOne: true,
        findAndCount: true,
      };
    }

    if (typeof cache === 'object') {
      this.cache = cache;
    }
  }
}

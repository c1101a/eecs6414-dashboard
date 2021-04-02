import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Topics, TopicsRelations} from '../models';

export class TopicsRepository extends DefaultCrudRepository<
  Topics,
  typeof Topics.prototype.id,
  TopicsRelations
> {
  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
  ) {
    super(Topics, dataSource);
  }
}

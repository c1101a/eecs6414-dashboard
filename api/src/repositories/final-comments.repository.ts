import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {FinalComments, FinalCommentsRelations} from '../models';

export class FinalCommentsRepository extends DefaultCrudRepository<
  FinalComments,
  typeof FinalComments.prototype.id,
  FinalCommentsRelations
> {
  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
  ) {
    super(FinalComments, dataSource);
  }
}

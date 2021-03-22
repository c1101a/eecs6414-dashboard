import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Graph, GraphRelations} from '../models';

export class GraphRepository extends DefaultCrudRepository<
  Graph,
  typeof Graph.prototype.id,
  GraphRelations
> {
  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
  ) {
    super(Graph, dataSource);
  }
}

import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {ChordConnections, ChordConnectionsRelations} from '../models';

export class ChordConnectionsRepository extends DefaultCrudRepository<
  ChordConnections,
  typeof ChordConnections.prototype.id,
  ChordConnectionsRelations
> {
  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
  ) {
    super(ChordConnections, dataSource);
  }
}

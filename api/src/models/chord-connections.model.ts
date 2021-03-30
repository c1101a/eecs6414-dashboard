import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'reddit', table: 'chord_connections'}}
})
export class ChordConnections extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    length: 20,
    mysql: {columnName: 'fromAuthor', dataType: 'varchar', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  fromAuthor: string;

  @property({
    type: 'string',
    required: true,
    length: 20,
    mysql: {columnName: 'toAuthor', dataType: 'varchar', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  toAuthor: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'comments', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  comments: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ChordConnections>) {
    super(data);
  }
}

export interface ChordConnectionsRelations {
  // describe navigational properties here
}

export type ChordConnectionsWithRelations = ChordConnections & ChordConnectionsRelations;

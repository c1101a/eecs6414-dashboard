import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'reddit', table: 'graph'}}})
export class Graph extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 'Id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  id: number;

  @property({
    type: 'string',
    length: 50,
    mysql: {columnName: 'FromAuthor', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  fromAuthor?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {columnName: 'ToAuthor', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  toAuthor?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {columnName: 'CommentId', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  commentId?: string;

  @property({
    type: 'string',
    length: 255,
    mysql: {columnName: 'Subreddit', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  subreddit?: string;

  @property({
    type: 'string',
    length: 50,
    mysql: {columnName: 'ParentId', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  parentId?: string;

  @property({
    type: 'string',
    length: 255,
    mysql: {columnName: 'Body', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  body?: string;

  @property({
    type: 'string',
    length: 255,
    mysql: {columnName: 'Created', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  created?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Graph>) {
    super(data);
  }
}

export interface GraphRelations {
  // describe navigational properties here
}

export type GraphWithRelations = Graph & GraphRelations;

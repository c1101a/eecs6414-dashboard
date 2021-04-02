import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'reddit', table: 'topics'}}})
export class Topics extends Entity {
  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    id: 1,
    mysql: {columnName: 'ID', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    length: 6,
    mysql: {columnName: 'TOPIC', dataType: 'varchar', dataLength: 6, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  topic: string;

  @property({
    type: 'string',
    required: true,
    length: 19,
    mysql: {columnName: 'USER', dataType: 'varchar', dataLength: 19, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  user: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'ANGER', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  anger: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'SADNESS', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  sadness: number;

  @property({
    type: 'number',
    required: true,
    precision: 4,
    scale: 1,
    mysql: {columnName: 'FEAR', dataType: 'decimal', dataLength: null, dataPrecision: 4, dataScale: 1, nullable: 'N'},
  })
  fear: number;

  @property({
    type: 'number',
    required: true,
    precision: 1,
    mysql: {columnName: 'NEUTRAL', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N'},
  })
  neutral: number;

  @property({
    type: 'number',
    required: true,
    precision: 1,
    mysql: {columnName: 'SURPRISE', dataType: 'bit', dataLength: null, dataPrecision: 1, dataScale: null, nullable: 'N'},
  })
  surprise: number;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'JOY', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  joy: number;

  @property({
    type: 'number',
    required: true,
    precision: 4,
    scale: 1,
    mysql: {columnName: 'TOTAL', dataType: 'decimal', dataLength: null, dataPrecision: 4, dataScale: 1, nullable: 'N'},
  })
  total: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Topics>) {
    super(data);
  }
}

export interface TopicsRelations {
  // describe navigational properties here
}

export type TopicsWithRelations = Topics & TopicsRelations;

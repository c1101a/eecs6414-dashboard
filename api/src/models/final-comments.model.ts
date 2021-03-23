import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'reddit', table: 'final_comments'}}
})
export class FinalComments extends Entity {
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
    required: true,
    length: 20,
    mysql: {columnName: 'UserID', dataType: 'varchar', dataLength: 20, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  userId: string;

  @property({
    type: 'string',
    required: true,
    length: 301,
    mysql: {columnName: 'Comment', dataType: 'varchar', dataLength: 301, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  comment: string;

  @property({
    type: 'string',
    required: true,
    length: 22,
    mysql: {columnName: 'SubReddit', dataType: 'varchar', dataLength: 22, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  subReddit: string;

  @property({
    type: 'number',
    required: true,
    precision: 10,
    scale: 0,
    mysql: {columnName: 'Timestamp', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N'},
  })
  timestamp: number;

  @property({
    type: 'string',
    required: true,
    length: 8,
    mysql: {columnName: 'Emotion', dataType: 'varchar', dataLength: 8, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  emotion: string;

  @property({
    type: 'number',
    required: true,
    precision: 14,
    scale: 11,
    mysql: {columnName: 'ScorePerUser', dataType: 'decimal', dataLength: null, dataPrecision: 14, dataScale: 11, nullable: 'N'},
  })
  scorePerUser: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<FinalComments>) {
    super(data);
  }
}

export interface FinalCommentsRelations {
  // describe navigational properties here
}

export type FinalCommentsWithRelations = FinalComments & FinalCommentsRelations;

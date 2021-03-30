import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ChordConnections} from '../models';
import {ChordConnectionsRepository} from '../repositories';

export class ConnectionsController {
  constructor(
    @repository(ChordConnectionsRepository)
    public chordConnectionsRepository : ChordConnectionsRepository,
  ) {}

  @post('/connections')
  @response(200, {
    description: 'ChordConnections model instance',
    content: {'application/json': {schema: getModelSchemaRef(ChordConnections)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ChordConnections, {
            title: 'NewChordConnections',
            exclude: ['id'],
          }),
        },
      },
    })
    chordConnections: Omit<ChordConnections, 'id'>,
  ): Promise<ChordConnections> {
    return this.chordConnectionsRepository.create(chordConnections);
  }

  @get('/connections/count')
  @response(200, {
    description: 'ChordConnections model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ChordConnections) where?: Where<ChordConnections>,
  ): Promise<Count> {
    return this.chordConnectionsRepository.count(where);
  }

  @get('/connections')
  @response(200, {
    description: 'Array of ChordConnections model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ChordConnections, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ChordConnections) filter?: Filter<ChordConnections>,
  ): Promise<ChordConnections[]> {
    return this.chordConnectionsRepository.find(filter);
  }

  @patch('/connections')
  @response(200, {
    description: 'ChordConnections PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ChordConnections, {partial: true}),
        },
      },
    })
    chordConnections: ChordConnections,
    @param.where(ChordConnections) where?: Where<ChordConnections>,
  ): Promise<Count> {
    return this.chordConnectionsRepository.updateAll(chordConnections, where);
  }

  @get('/connections/{id}')
  @response(200, {
    description: 'ChordConnections model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ChordConnections, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ChordConnections, {exclude: 'where'}) filter?: FilterExcludingWhere<ChordConnections>
  ): Promise<ChordConnections> {
    return this.chordConnectionsRepository.findById(id, filter);
  }

  @patch('/connections/{id}')
  @response(204, {
    description: 'ChordConnections PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ChordConnections, {partial: true}),
        },
      },
    })
    chordConnections: ChordConnections,
  ): Promise<void> {
    await this.chordConnectionsRepository.updateById(id, chordConnections);
  }

  @put('/connections/{id}')
  @response(204, {
    description: 'ChordConnections PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() chordConnections: ChordConnections,
  ): Promise<void> {
    await this.chordConnectionsRepository.replaceById(id, chordConnections);
  }

  @del('/connections/{id}')
  @response(204, {
    description: 'ChordConnections DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.chordConnectionsRepository.deleteById(id);
  }
}

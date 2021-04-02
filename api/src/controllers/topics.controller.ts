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
import {Topics} from '../models';
import {TopicsRepository} from '../repositories';

export class TopicsController {
  constructor(
    @repository(TopicsRepository)
    public topicsRepository : TopicsRepository,
  ) {}

  @post('/topics')
  @response(200, {
    description: 'Topics model instance',
    content: {'application/json': {schema: getModelSchemaRef(Topics)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Topics, {
            title: 'NewTopics',
            exclude: ['id'],
          }),
        },
      },
    })
    topics: Omit<Topics, 'id'>,
  ): Promise<Topics> {
    return this.topicsRepository.create(topics);
  }

  @get('/topics/count')
  @response(200, {
    description: 'Topics model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Topics) where?: Where<Topics>,
  ): Promise<Count> {
    return this.topicsRepository.count(where);
  }

  @get('/topics')
  @response(200, {
    description: 'Array of Topics model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Topics, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Topics) filter?: Filter<Topics>,
  ): Promise<Topics[]> {
    return this.topicsRepository.find(filter);
  }

  @patch('/topics')
  @response(200, {
    description: 'Topics PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Topics, {partial: true}),
        },
      },
    })
    topics: Topics,
    @param.where(Topics) where?: Where<Topics>,
  ): Promise<Count> {
    return this.topicsRepository.updateAll(topics, where);
  }

  @get('/topics/{id}')
  @response(200, {
    description: 'Topics model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Topics, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Topics, {exclude: 'where'}) filter?: FilterExcludingWhere<Topics>
  ): Promise<Topics> {
    return this.topicsRepository.findById(id, filter);
  }

  @patch('/topics/{id}')
  @response(204, {
    description: 'Topics PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Topics, {partial: true}),
        },
      },
    })
    topics: Topics,
  ): Promise<void> {
    await this.topicsRepository.updateById(id, topics);
  }

  @put('/topics/{id}')
  @response(204, {
    description: 'Topics PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() topics: Topics,
  ): Promise<void> {
    await this.topicsRepository.replaceById(id, topics);
  }

  @del('/topics/{id}')
  @response(204, {
    description: 'Topics DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.topicsRepository.deleteById(id);
  }
}

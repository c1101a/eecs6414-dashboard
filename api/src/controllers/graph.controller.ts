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
import {Graph} from '../models';
import {GraphRepository} from '../repositories';

export class GraphController {
  constructor(
    @repository(GraphRepository)
    public graphRepository : GraphRepository,
  ) {}

  @post('/graphs')
  @response(200, {
    description: 'Graph model instance',
    content: {'application/json': {schema: getModelSchemaRef(Graph)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Graph, {
            title: 'NewGraph',
            exclude: ['id'],
          }),
        },
      },
    })
    graph: Omit<Graph, 'id'>,
  ): Promise<Graph> {
    return this.graphRepository.create(graph);
  }

  @get('/graphs/count')
  @response(200, {
    description: 'Graph model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Graph) where?: Where<Graph>,
  ): Promise<Count> {
    return this.graphRepository.count(where);
  }

  @get('/graphs')
  @response(200, {
    description: 'Array of Graph model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Graph, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Graph) filter?: Filter<Graph>,
  ): Promise<Graph[]> {
    return this.graphRepository.find(filter);
  }

  @patch('/graphs')
  @response(200, {
    description: 'Graph PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Graph, {partial: true}),
        },
      },
    })
    graph: Graph,
    @param.where(Graph) where?: Where<Graph>,
  ): Promise<Count> {
    return this.graphRepository.updateAll(graph, where);
  }

  @get('/graphs/{id}')
  @response(200, {
    description: 'Graph model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Graph, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Graph, {exclude: 'where'}) filter?: FilterExcludingWhere<Graph>
  ): Promise<Graph> {
    return this.graphRepository.findById(id, filter);
  }

  @patch('/graphs/{id}')
  @response(204, {
    description: 'Graph PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Graph, {partial: true}),
        },
      },
    })
    graph: Graph,
  ): Promise<void> {
    await this.graphRepository.updateById(id, graph);
  }

  @put('/graphs/{id}')
  @response(204, {
    description: 'Graph PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() graph: Graph,
  ): Promise<void> {
    await this.graphRepository.replaceById(id, graph);
  }

  @del('/graphs/{id}')
  @response(204, {
    description: 'Graph DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.graphRepository.deleteById(id);
  }
}

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
import {FinalComments} from '../models';
import {FinalCommentsRepository} from '../repositories';

export class CommentController {
  constructor(
    @repository(FinalCommentsRepository)
    public finalCommentsRepository : FinalCommentsRepository,
  ) {}

  @post('/comment')
  @response(200, {
    description: 'FinalComments model instance',
    content: {'application/json': {schema: getModelSchemaRef(FinalComments)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FinalComments, {
            title: 'NewFinalComments',
            exclude: ['id'],
          }),
        },
      },
    })
    finalComments: Omit<FinalComments, 'id'>,
  ): Promise<FinalComments> {
    return this.finalCommentsRepository.create(finalComments);
  }

  @get('/comment/count')
  @response(200, {
    description: 'FinalComments model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(FinalComments) where?: Where<FinalComments>,
  ): Promise<Count> {
    return this.finalCommentsRepository.count(where);
  }

  @get('/comment')
  @response(200, {
    description: 'Array of FinalComments model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FinalComments, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(FinalComments) filter?: Filter<FinalComments>,
  ): Promise<FinalComments[]> {
    return this.finalCommentsRepository.find(filter);
  }

  @patch('/comment')
  @response(200, {
    description: 'FinalComments PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FinalComments, {partial: true}),
        },
      },
    })
    finalComments: FinalComments,
    @param.where(FinalComments) where?: Where<FinalComments>,
  ): Promise<Count> {
    return this.finalCommentsRepository.updateAll(finalComments, where);
  }

  @get('/comment/{id}')
  @response(200, {
    description: 'FinalComments model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FinalComments, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(FinalComments, {exclude: 'where'}) filter?: FilterExcludingWhere<FinalComments>
  ): Promise<FinalComments> {
    return this.finalCommentsRepository.findById(id, filter);
  }

  @patch('/comment/{id}')
  @response(204, {
    description: 'FinalComments PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FinalComments, {partial: true}),
        },
      },
    })
    finalComments: FinalComments,
  ): Promise<void> {
    await this.finalCommentsRepository.updateById(id, finalComments);
  }

  @put('/comment/{id}')
  @response(204, {
    description: 'FinalComments PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() finalComments: FinalComments,
  ): Promise<void> {
    await this.finalCommentsRepository.replaceById(id, finalComments);
  }

  @del('/comment/{id}')
  @response(204, {
    description: 'FinalComments DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.finalCommentsRepository.deleteById(id);
  }
}

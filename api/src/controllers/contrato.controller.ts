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
import {Contracto} from '../models';
import {ContractoRepository} from '../repositories';

export class ContratoController {
  constructor(
    @repository(ContractoRepository)
    public contractoRepository : ContractoRepository,
  ) {}

  @post('/contractos')
  @response(200, {
    description: 'Contracto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Contracto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contracto, {
            title: 'NewContracto',
            exclude: ['id'],
          }),
        },
      },
    })
    contracto: Omit<Contracto, 'id'>,
  ): Promise<Contracto> {
    return this.contractoRepository.create(contracto);
  }

  @get('/contractos/count')
  @response(200, {
    description: 'Contracto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Contracto) where?: Where<Contracto>,
  ): Promise<Count> {
    return this.contractoRepository.count(where);
  }

  @get('/contractos')
  @response(200, {
    description: 'Array of Contracto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Contracto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Contracto) filter?: Filter<Contracto>,
  ): Promise<Contracto[]> {
    return this.contractoRepository.find(filter);
  }

  @patch('/contractos')
  @response(200, {
    description: 'Contracto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contracto, {partial: true}),
        },
      },
    })
    contracto: Contracto,
    @param.where(Contracto) where?: Where<Contracto>,
  ): Promise<Count> {
    return this.contractoRepository.updateAll(contracto, where);
  }

  @get('/contractos/{id}')
  @response(200, {
    description: 'Contracto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Contracto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Contracto, {exclude: 'where'}) filter?: FilterExcludingWhere<Contracto>
  ): Promise<Contracto> {
    return this.contractoRepository.findById(id, filter);
  }

  @patch('/contractos/{id}')
  @response(204, {
    description: 'Contracto PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contracto, {partial: true}),
        },
      },
    })
    contracto: Contracto,
  ): Promise<void> {
    await this.contractoRepository.updateById(id, contracto);
  }

  @put('/contractos/{id}')
  @response(204, {
    description: 'Contracto PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() contracto: Contracto,
  ): Promise<void> {
    await this.contractoRepository.replaceById(id, contracto);
  }

  @del('/contractos/{id}')
  @response(204, {
    description: 'Contracto DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.contractoRepository.deleteById(id);
  }
}

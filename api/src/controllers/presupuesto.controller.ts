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
import {Presupuesto} from '../models';
import {PresupuestoRepository} from '../repositories';

export class PresupuestoController {
  constructor(
    @repository(PresupuestoRepository)
    public presupuestoRepository : PresupuestoRepository,
  ) {}

  @post('/presupuestos')
  @response(200, {
    description: 'Presupuesto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Presupuesto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Presupuesto, {
            title: 'NewPresupuesto',
            exclude: ['id'],
          }),
        },
      },
    })
    presupuesto: Omit<Presupuesto, 'id'>,
  ): Promise<Presupuesto> {
    return this.presupuestoRepository.create(presupuesto);
  }

  @get('/presupuestos/count')
  @response(200, {
    description: 'Presupuesto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Presupuesto) where?: Where<Presupuesto>,
  ): Promise<Count> {
    return this.presupuestoRepository.count(where);
  }

  @get('/presupuestos')
  @response(200, {
    description: 'Array of Presupuesto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Presupuesto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Presupuesto) filter?: Filter<Presupuesto>,
  ): Promise<Presupuesto[]> {
    return this.presupuestoRepository.find(filter);
  }

  @patch('/presupuestos')
  @response(200, {
    description: 'Presupuesto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Presupuesto, {partial: true}),
        },
      },
    })
    presupuesto: Presupuesto,
    @param.where(Presupuesto) where?: Where<Presupuesto>,
  ): Promise<Count> {
    return this.presupuestoRepository.updateAll(presupuesto, where);
  }

  @get('/presupuestos/{id}')
  @response(200, {
    description: 'Presupuesto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Presupuesto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Presupuesto, {exclude: 'where'}) filter?: FilterExcludingWhere<Presupuesto>
  ): Promise<Presupuesto> {
    return this.presupuestoRepository.findById(id, filter);
  }

  @patch('/presupuestos/{id}')
  @response(204, {
    description: 'Presupuesto PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Presupuesto, {partial: true}),
        },
      },
    })
    presupuesto: Presupuesto,
  ): Promise<void> {
    await this.presupuestoRepository.updateById(id, presupuesto);
  }

  @put('/presupuestos/{id}')
  @response(204, {
    description: 'Presupuesto PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() presupuesto: Presupuesto,
  ): Promise<void> {
    await this.presupuestoRepository.replaceById(id, presupuesto);
  }

  @del('/presupuestos/{id}')
  @response(204, {
    description: 'Presupuesto DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.presupuestoRepository.deleteById(id);
  }
}

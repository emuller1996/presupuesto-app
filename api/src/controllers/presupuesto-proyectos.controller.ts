import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Presupuesto,
  Proyectos,
} from '../models';
import {PresupuestoRepository} from '../repositories';

export class PresupuestoProyectosController {
  constructor(
    @repository(PresupuestoRepository) protected presupuestoRepository: PresupuestoRepository,
  ) { }

  @get('/presupuestos/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Array of Presupuesto has many Proyectos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proyectos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Proyectos>,
  ): Promise<Proyectos[]> {
    return this.presupuestoRepository.proyectos(id).find(filter);
  }

  @post('/presupuestos/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Presupuesto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proyectos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Presupuesto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, {
            title: 'NewProyectosInPresupuesto',
            exclude: ['id'],
            optional: ['presupuestoId']
          }),
        },
      },
    }) proyectos: Omit<Proyectos, 'id'>,
  ): Promise<Proyectos> {
    return this.presupuestoRepository.proyectos(id).create(proyectos);
  }

  @patch('/presupuestos/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Presupuesto.Proyectos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, {partial: true}),
        },
      },
    })
    proyectos: Partial<Proyectos>,
    @param.query.object('where', getWhereSchemaFor(Proyectos)) where?: Where<Proyectos>,
  ): Promise<Count> {
    return this.presupuestoRepository.proyectos(id).patch(proyectos, where);
  }

  @del('/presupuestos/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Presupuesto.Proyectos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Proyectos)) where?: Where<Proyectos>,
  ): Promise<Count> {
    return this.presupuestoRepository.proyectos(id).delete(where);
  }
}

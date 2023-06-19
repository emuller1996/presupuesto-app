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
  Proyectos,
  Contracto,
} from '../models';
import {ProyectosRepository} from '../repositories';

export class ProyectosContractoController {
  constructor(
    @repository(ProyectosRepository) protected proyectosRepository: ProyectosRepository,
  ) { }

  @get('/proyectos/{id}/contractos', {
    responses: {
      '200': {
        description: 'Array of Proyectos has many Contracto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Contracto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Contracto>,
  ): Promise<Contracto[]> {
    return this.proyectosRepository.contractos(id).find(filter);
  }

  @post('/proyectos/{id}/contractos', {
    responses: {
      '200': {
        description: 'Proyectos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Contracto)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Proyectos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contracto, {
            title: 'NewContractoInProyectos',
            exclude: ['id'],
            optional: ['proyectosId']
          }),
        },
      },
    }) contracto: Omit<Contracto, 'id'>,
  ): Promise<Contracto> {
    return this.proyectosRepository.contractos(id).create(contracto);
  }

  @patch('/proyectos/{id}/contractos', {
    responses: {
      '200': {
        description: 'Proyectos.Contracto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contracto, {partial: true}),
        },
      },
    })
    contracto: Partial<Contracto>,
    @param.query.object('where', getWhereSchemaFor(Contracto)) where?: Where<Contracto>,
  ): Promise<Count> {
    return this.proyectosRepository.contractos(id).patch(contracto, where);
  }

  @del('/proyectos/{id}/contractos', {
    responses: {
      '200': {
        description: 'Proyectos.Contracto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Contracto)) where?: Where<Contracto>,
  ): Promise<Count> {
    return this.proyectosRepository.contractos(id).delete(where);
  }
}

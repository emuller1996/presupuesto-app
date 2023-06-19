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
  Contracto,
  Factura,
} from '../models';
import {ContractoRepository, ProyectosRepository} from '../repositories';

export class ContractoFacturaController {
  constructor(
    @repository(ContractoRepository) protected contractoRepository: ContractoRepository,
    @repository(ProyectosRepository) protected proyectoRepository: ProyectosRepository,

  ) { }

  @get('/contractos/{id}/facturas', {
    responses: {
      '200': {
        description: 'Array of Contracto has many Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Factura>,
  ): Promise<Factura[]> {
    return this.contractoRepository.facturas(id).find(filter);
  }

  @post('/contractos/{id}/facturas', {
    responses: {
      '200': {
        description: 'Contracto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Factura)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Contracto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFacturaInContracto',
            exclude: ['id'],
            optional: ['contractoId']
          }),
        },
      },
    }) factura: Omit<Factura, 'id'>,
  ): Promise<Factura> {
    return this.contractoRepository.facturas(id).create(factura);
  }

  @patch('/contractos/{id}/facturas', {
    responses: {
      '200': {
        description: 'Contracto.Factura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Partial<Factura>,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    
    
    return this.contractoRepository.facturas(id).patch(factura, where);
  }

  @del('/contractos/{id}/facturas', {
    responses: {
      '200': {
        description: 'Contracto.Factura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.contractoRepository.facturas(id).delete(where);
  }
}

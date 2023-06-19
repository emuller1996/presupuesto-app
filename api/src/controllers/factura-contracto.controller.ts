import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Factura,
  Contracto,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaContractoController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/contracto', {
    responses: {
      '200': {
        description: 'Contracto belonging to Factura',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Contracto),
          },
        },
      },
    },
  })
  async getContracto(
    @param.path.number('id') id: typeof Factura.prototype.id,
  ): Promise<Contracto> {
    return this.facturaRepository.contracto(id);
  }
}

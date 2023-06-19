import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Contracto} from './contracto.model';

@model({
  settings: {
    foreignKeys: {
      fk_factura_contractoId: {
        name: 'fk_factura_contractoId',
        entity: 'Contracto',
        entityKey: 'id',
        foreignKey: 'contractoId',
      },
    },
  },
})
export class Factura extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaCreada: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'number',
    required: true,
  })
  totalFactura: number;

  @property({
    type: 'date',
  })
  fechaPagada?: string;

  @belongsTo(() => Contracto)
  contractoId: number;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;

import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Proyectos} from './proyectos.model';
import {Factura} from './factura.model';

@model({
  settings: {
    foreignKeys: {
      fk_contracto_proyectosId: {
        name: 'fk_contracto_proyectosId',
        entity: 'Proyectos',
        entityKey: 'id',
        foreignKey: 'proyectosId',
      },
    },
  },
})
export class Contracto extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  monto_total: number;

  @property({
    type: 'number',
    default: 0,
  })
  monto_usado?: number;

  @property({
    type: 'number',
  })
  monto_disponible?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_creado: string;

  @belongsTo(() => Proyectos)
  proyectosId: number;

  @hasMany(() => Factura)
  facturas: Factura[];

  constructor(data?: Partial<Contracto>) {
    super(data);
  }
}

export interface ContractoRelations {
  // describe navigational properties here
}

export type ContractoWithRelations = Contracto & ContractoRelations;

import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Presupuesto} from './presupuesto.model';
import {Contracto} from './contracto.model';

@model({
  settings: {
    foreignKeys: {
      fk_proyectos_presupuestoId: {
        name: 'fk_proyectos_presupuestoId',
        entity: 'Presupuesto',
        entityKey: 'id',
        foreignKey: 'presupuestoId',
      },
    },
  },
})
export class Proyectos extends Entity {
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
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  montoTotal: number;

  @property({
    type: 'number',
  })
  montoUsado?: number;

  @property({
    type: 'number',
  })
  montoDisponible?: number;

  @belongsTo(() => Presupuesto)
  presupuestoId: number;

  @hasMany(() => Contracto)
  contractos: Contracto[];

  constructor(data?: Partial<Proyectos>) {
    super(data);
  }
}

export interface ProyectosRelations {
  // describe navigational properties here
}

export type ProyectosWithRelations = Proyectos & ProyectosRelations;

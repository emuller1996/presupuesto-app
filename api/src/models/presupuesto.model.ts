import {Entity, model, property, hasMany} from '@loopback/repository';
import {Proyectos} from './proyectos.model';

@model()
export class Presupuesto extends Entity {
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
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  totalCantidad: number;

  @property({
    type: 'number',
  })
  totalGasto?: number;

  @property({
    type: 'number',
  })
  totalGastoPorcentaje?: number;

  @property({
    type: 'number',
  })
  totalRestante?: number;

  @hasMany(() => Proyectos)
  proyectos: Proyectos[];

  constructor(data?: Partial<Presupuesto>) {
    super(data);
  }
}

export interface PresupuestoRelations {
  // describe navigational properties here
}

export type PresupuestoWithRelations = Presupuesto & PresupuestoRelations;

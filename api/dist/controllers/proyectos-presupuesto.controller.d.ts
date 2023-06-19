import { Proyectos, Presupuesto } from '../models';
import { ProyectosRepository } from '../repositories';
export declare class ProyectosPresupuestoController {
    proyectosRepository: ProyectosRepository;
    constructor(proyectosRepository: ProyectosRepository);
    getPresupuesto(id: typeof Proyectos.prototype.id): Promise<Presupuesto>;
}

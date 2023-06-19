import { Contracto, Proyectos } from '../models';
import { ContractoRepository } from '../repositories';
export declare class ContractoProyectosController {
    contractoRepository: ContractoRepository;
    constructor(contractoRepository: ContractoRepository);
    getProyectos(id: typeof Contracto.prototype.id): Promise<Proyectos>;
}

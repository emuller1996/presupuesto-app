import { Factura, Contracto } from '../models';
import { FacturaRepository } from '../repositories';
export declare class FacturaContractoController {
    facturaRepository: FacturaRepository;
    constructor(facturaRepository: FacturaRepository);
    getContracto(id: typeof Factura.prototype.id): Promise<Contracto>;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProyectosPresupuestoController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ProyectosPresupuestoController = class ProyectosPresupuestoController {
    constructor(proyectosRepository) {
        this.proyectosRepository = proyectosRepository;
    }
    async getPresupuesto(id) {
        return this.proyectosRepository.presupuesto(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/proyectos/{id}/presupuesto', {
        responses: {
            '200': {
                description: 'Presupuesto belonging to Proyectos',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Presupuesto) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProyectosPresupuestoController.prototype, "getPresupuesto", null);
ProyectosPresupuestoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ProyectosRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ProyectosRepository])
], ProyectosPresupuestoController);
exports.ProyectosPresupuestoController = ProyectosPresupuestoController;
//# sourceMappingURL=proyectos-presupuesto.controller.js.map
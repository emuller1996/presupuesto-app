"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresupuestoController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let PresupuestoController = class PresupuestoController {
    constructor(presupuestoRepository) {
        this.presupuestoRepository = presupuestoRepository;
    }
    async create(presupuesto) {
        return this.presupuestoRepository.create(presupuesto);
    }
    async count(where) {
        return this.presupuestoRepository.count(where);
    }
    async find(filter) {
        return this.presupuestoRepository.find(filter);
    }
    async updateAll(presupuesto, where) {
        return this.presupuestoRepository.updateAll(presupuesto, where);
    }
    async findById(id, filter) {
        return this.presupuestoRepository.findById(id, filter);
    }
    async updateById(id, presupuesto) {
        await this.presupuestoRepository.updateById(id, presupuesto);
    }
    async replaceById(id, presupuesto) {
        await this.presupuestoRepository.replaceById(id, presupuesto);
    }
    async deleteById(id) {
        await this.presupuestoRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/presupuestos'),
    (0, rest_1.response)(200, {
        description: 'Presupuesto model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Presupuesto) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Presupuesto, {
                    title: 'NewPresupuesto',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PresupuestoController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/presupuestos/count'),
    (0, rest_1.response)(200, {
        description: 'Presupuesto model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Presupuesto)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PresupuestoController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/presupuestos'),
    (0, rest_1.response)(200, {
        description: 'Array of Presupuesto model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Presupuesto, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Presupuesto)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PresupuestoController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/presupuestos'),
    (0, rest_1.response)(200, {
        description: 'Presupuesto PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Presupuesto, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Presupuesto)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Presupuesto, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PresupuestoController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/presupuestos/{id}'),
    (0, rest_1.response)(200, {
        description: 'Presupuesto model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Presupuesto, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Presupuesto, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PresupuestoController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/presupuestos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Presupuesto PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Presupuesto, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Presupuesto]),
    tslib_1.__metadata("design:returntype", Promise)
], PresupuestoController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/presupuestos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Presupuesto PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Presupuesto]),
    tslib_1.__metadata("design:returntype", Promise)
], PresupuestoController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/presupuestos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Presupuesto DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], PresupuestoController.prototype, "deleteById", null);
PresupuestoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.PresupuestoRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.PresupuestoRepository])
], PresupuestoController);
exports.PresupuestoController = PresupuestoController;
//# sourceMappingURL=presupuesto.controller.js.map
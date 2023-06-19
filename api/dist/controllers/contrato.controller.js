"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContratoController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ContratoController = class ContratoController {
    constructor(contractoRepository) {
        this.contractoRepository = contractoRepository;
    }
    async create(contracto) {
        return this.contractoRepository.create(contracto);
    }
    async count(where) {
        return this.contractoRepository.count(where);
    }
    async find(filter) {
        return this.contractoRepository.find(filter);
    }
    async updateAll(contracto, where) {
        return this.contractoRepository.updateAll(contracto, where);
    }
    async findById(id, filter) {
        return this.contractoRepository.findById(id, filter);
    }
    async updateById(id, contracto) {
        await this.contractoRepository.updateById(id, contracto);
    }
    async replaceById(id, contracto) {
        await this.contractoRepository.replaceById(id, contracto);
    }
    async deleteById(id) {
        await this.contractoRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/contractos'),
    (0, rest_1.response)(200, {
        description: 'Contracto model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Contracto) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Contracto, {
                    title: 'NewContracto',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ContratoController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/contractos/count'),
    (0, rest_1.response)(200, {
        description: 'Contracto model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Contracto)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ContratoController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/contractos'),
    (0, rest_1.response)(200, {
        description: 'Array of Contracto model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Contracto, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Contracto)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ContratoController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/contractos'),
    (0, rest_1.response)(200, {
        description: 'Contracto PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Contracto, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Contracto)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Contracto, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ContratoController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/contractos/{id}'),
    (0, rest_1.response)(200, {
        description: 'Contracto model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Contracto, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Contracto, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ContratoController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/contractos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Contracto PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Contracto, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Contracto]),
    tslib_1.__metadata("design:returntype", Promise)
], ContratoController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/contractos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Contracto PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Contracto]),
    tslib_1.__metadata("design:returntype", Promise)
], ContratoController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/contractos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Contracto DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ContratoController.prototype, "deleteById", null);
ContratoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ContractoRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ContractoRepository])
], ContratoController);
exports.ContratoController = ContratoController;
//# sourceMappingURL=contrato.controller.js.map
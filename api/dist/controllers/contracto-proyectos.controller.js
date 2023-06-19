"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractoProyectosController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ContractoProyectosController = class ContractoProyectosController {
    constructor(contractoRepository) {
        this.contractoRepository = contractoRepository;
    }
    async getProyectos(id) {
        return this.contractoRepository.proyectos(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/contractos/{id}/proyectos', {
        responses: {
            '200': {
                description: 'Proyectos belonging to Contracto',
                content: {
                    'application/json': {
                        schema: (0, rest_1.getModelSchemaRef)(models_1.Proyectos),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ContractoProyectosController.prototype, "getProyectos", null);
ContractoProyectosController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ContractoRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ContractoRepository])
], ContractoProyectosController);
exports.ContractoProyectosController = ContractoProyectosController;
//# sourceMappingURL=contracto-proyectos.controller.js.map
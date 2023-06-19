"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proyectos = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const presupuesto_model_1 = require("./presupuesto.model");
const contracto_model_1 = require("./contracto.model");
let Proyectos = class Proyectos extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Proyectos.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Proyectos.prototype, "nombre", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Proyectos.prototype, "descripcion", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Proyectos.prototype, "montoTotal", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Proyectos.prototype, "montoUsado", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Proyectos.prototype, "montoDisponible", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => presupuesto_model_1.Presupuesto),
    tslib_1.__metadata("design:type", Number)
], Proyectos.prototype, "presupuestoId", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => contracto_model_1.Contracto),
    tslib_1.__metadata("design:type", Array)
], Proyectos.prototype, "contractos", void 0);
Proyectos = tslib_1.__decorate([
    (0, repository_1.model)({
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
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Proyectos);
exports.Proyectos = Proyectos;
//# sourceMappingURL=proyectos.model.js.map
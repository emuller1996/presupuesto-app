"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Presupuesto = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const proyectos_model_1 = require("./proyectos.model");
let Presupuesto = class Presupuesto extends repository_1.Entity {
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
], Presupuesto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Presupuesto.prototype, "descripcion", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Presupuesto.prototype, "totalCantidad", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Presupuesto.prototype, "totalGasto", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Presupuesto.prototype, "totalGastoPorcentaje", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Presupuesto.prototype, "totalRestante", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => proyectos_model_1.Proyectos),
    tslib_1.__metadata("design:type", Array)
], Presupuesto.prototype, "proyectos", void 0);
Presupuesto = tslib_1.__decorate([
    (0, repository_1.model)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Presupuesto);
exports.Presupuesto = Presupuesto;
//# sourceMappingURL=presupuesto.model.js.map
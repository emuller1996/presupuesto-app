"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProyectosRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let ProyectosRepository = class ProyectosRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, presupuestoRepositoryGetter, contractoRepositoryGetter) {
        super(models_1.Proyectos, dataSource);
        this.presupuestoRepositoryGetter = presupuestoRepositoryGetter;
        this.contractoRepositoryGetter = contractoRepositoryGetter;
        this.contractos = this.createHasManyRepositoryFactoryFor('contractos', contractoRepositoryGetter);
        this.registerInclusionResolver('contractos', this.contractos.inclusionResolver);
        this.presupuesto = this.createBelongsToAccessorFor('presupuesto', presupuestoRepositoryGetter);
        this.registerInclusionResolver('presupuesto', this.presupuesto.inclusionResolver);
    }
};
ProyectosRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mysql')),
    tslib_1.__param(1, repository_1.repository.getter('PresupuestoRepository')),
    tslib_1.__param(2, repository_1.repository.getter('ContractoRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function, Function])
], ProyectosRepository);
exports.ProyectosRepository = ProyectosRepository;
//# sourceMappingURL=proyectos.repository.js.map
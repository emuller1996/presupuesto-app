import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  deleteContractoServicio,
  getAllcontractosByProyectosService,
  getProyectoById,
} from "../../services/proyectos.servicios";
import ContractoFormulario from "./ContractoFormulario";
import ProgressBar from "react-bootstrap/esm/ProgressBar";
import { toast } from "react-hot-toast";
import { MostrarDinero } from "../../utils";

export default function ProyectosComponent() {
  const [proyectoActual, setProyectoActual] = useState(undefined);
  const [contractosAll, setContractosAll] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    getAllProyectos(id);
  }, [id]);

  const getAllProyectos = async (id) => {
    try {
      setContractosAll(await getAllcontractosByProyectosService(id));
      setProyectoActual(await getProyectoById(id));
    } catch (error) { }
  };
  return (
    <div class="container mt-5">
      <div class="card text-start">
        <div className="p-2">
          <Link
            to="/presupuesto"
            class="float-end btn btn-danger p-3 rounded-4"
          >
            <i class="fa-solid fa-xl fa-angles-left"></i>
          </Link>
        </div>
        <div class="card-body">
          <div className="card">
            <div className="card-body">
              <h4 className="text-center">
                {proyectoActual && proyectoActual.nombre}
              </h4>
              <div className="row g-3">
                <div className="col-12">
                  <div className="text-center">
                    <p> {proyectoActual &&
                      MostrarDinero(proyectoActual.montoTotal)} </p>
                  </div>
                  <ProgressBar className="mb-3" style={{ height: "2em" }}>
                    <ProgressBar striped variant="danger" now={proyectoActual && proyectoActual.gastoPorcentaje} key={1} />
                    <ProgressBar variant="warning" now={proyectoActual && proyectoActual.asignadoPorcentaje} key={2} />
                    <ProgressBar variant="secondary" now={proyectoActual && proyectoActual.restantePorcenjate} key={3} />
                  </ProgressBar>

                </div>
                <div className="col-md-4">
                  <span>
                    Monto Asignado :
                    {proyectoActual &&
                      MostrarDinero((proyectoActual.montoAsignado + proyectoActual.montoUsado))}
                  </span>
                  <span className="px-2 bg-warning ms-2 rounded-2"></span>

                </div>

                <div className="col-md-4">
                  <span>
                    Monto Usado :
                    {proyectoActual &&
                      MostrarDinero(proyectoActual.montoUsado)}
                  </span>
                  <span className="px-2 bg-danger ms-2 rounded-2"></span>

                </div>

                <div className="col-md-4">
                  <span>
                    Monto Disponible :
                    {proyectoActual &&
                      MostrarDinero(proyectoActual.montoDisponible)}
                  </span>
                  <span className="px-2 bg-secondary ms-2 rounded-2"></span>

                </div>

                <div className="col-12">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#ModalNuevoContracto"
                    className="btn btn-success w-100 rounded-4 py-2 fw-bold"
                  >
                    <i class="fa-solid fa-file-contract me-3 fa-xl"></i>
                    CREAR CONTRACTO
                  </button>
                </div>

                <div className="col-6">
                  <Link
                    to={proyectoActual && `/proyecto/${proyectoActual.id}/facturas`}
                    className="btn btn-warning text-white w-100 rounded-4 py-2 fw-bold"
                  >
                    <i class="fa-solid fa-coins me-3 fa-xl"></i>
                    FACTURAS
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-borderless table-hover mt-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th width="300px">Nombre</th>
                  <th>Monto Total</th>
                  <th>Monto Disponible</th>
                  <th>Monto Usado</th>
                  <th width="10px">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {contractosAll && contractosAll.length === 0 && (
                  <tr>
                    <td className="text-center py-4" colSpan={6}>
                      {" "}
                      NO HAY CONTRACTOS
                    </td>
                  </tr>
                )}
                {contractosAll &&
                  contractosAll.map((c) => (
                    <tr>
                      <td>{c.id}</td>
                      <td>{c.nombre}</td>
                      <td>{MostrarDinero(c.monto_total)}</td>
                      <td>{MostrarDinero(c.monto_disponible)}</td>
                      <td>{MostrarDinero(c.monto_usado)}</td>
                      <td>
                        <div
                          class="btn-group rounded-4"
                          role="group"
                          aria-label="Basic example"
                        >
                          <button
                            type="button"
                            class="btn btn-danger "
                            onClick={async () => {
                              try {
                                await deleteContractoServicio(c.id);
                                getAllProyectos(id)
                                toast("Contracto Elimando Correctamente.")
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          >
                            Eliminar
                          </button>
                          <button
                            type="button"
                            class="btn btn-info text-white "
                          >
                            Editar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="ModalNuevoContracto"
        tabindex="-1"
        aria-labelledby="ModalNuevoContracto"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content rounded-4 border-2 border-success">
            <div class="modal-header bg-success rounded-top-4  border-0">
              <h1 class="modal-title fs-5" id="ModalNuevoContracto">
                Crear Nuevo Contracto
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              class="modal-body rounded-bottom-4"
              style={{ backgroundColor: "#e8e8e8" }}
            >
              <ContractoFormulario
                proyectoId={id}
                getAllProyectos={getAllProyectos}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

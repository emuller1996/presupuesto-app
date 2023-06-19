import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProyectoById } from "../../services/proyectos.servicios";

export default function FacturasComponent() {
  const [proyectoActual, setProyectoActual] = useState(undefined);
  const [facturasTodas, setFacturasTodas] = useState([1, 2, 3, 4, 5, 6]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProyectoActual(id);
  }, [id]);

  const getProyectoActual = async (id) => {
    setProyectoActual(await getProyectoById(id));
  };
  return (
    <div class="container-xxl mt-5">
      <div class="card text-start">
        <div className="d-flex align-items-end center p-3  border-bottom ">
            <h4 className="w-100">
              FACTURAS : {proyectoActual && proyectoActual.nombre}{" "}
            </h4>
          <button
            onClick={() => {
              navigate(`/proyecto/${id}`);
            }}
            class="float-end btn btn-danger p-3 rounded-4"
          >
            <i class="fa-solid fa-xl fa-angles-left"></i>
          </button>
        </div>
          <div class="card-body">

            <div className="row g-3">
              {facturasTodas &&
                facturasTodas.map((f) => (
                  <div className="col-sm-12 col-md-6 col-xl-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="row g-4">
                          <div className="col-6">
                            <span className="fw-semibol fs-5"> FACT#1</span>
                          </div>
                          <div className="col-6">
                            <span className="fw-semibol fs-5">
                              Fecha: 2023/09/05
                            </span>
                          </div>
                          <div className="col-12 text-center">
                            <span class="badge bg-secondary fs-5 rounded-3">
                              PENDIENTE
                            </span>
                          </div>
                          <div className="col-6 ">
                            <span class=" fs-5">Contracto</span>
                          </div>
                          <div className="col-6 ">
                            <span class=" fs-5">$500</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
      </div>
    </div>
  );
}

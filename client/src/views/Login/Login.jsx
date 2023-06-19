import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [errorRequest, setErrorRequest] = useState(undefined);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setErrorRequest(undefined);
    try {
      const result = await axios.post("http://localhost:4000/login", {
        user: data,
      });
      localStorage.setItem("token", result.headers.getAuthorization());

      navigate("/presupuesto");
    } catch (error) {
      console.log(error.response.data);
      setErrorRequest(
        error.response.data ? error.response.data : error.message
      );
    }
  };
  return (
    <>
      <div class="container mt-5 text-dark">
        <div class="card text-dark bg-light">
          <div class="card-body">
            <h4 class="card-title mb-4">Login</h4>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="mb-3">
                <label for="email" class="form-label">
                  Email
                </label>
                <input
                  type="email"
                  class="form-control"
                  {...register("email", {
                    required: "Email is required",
                    pattern:
                      "^(([^<>()[]\\.,;:s@”]+(.[^<>()[]\\.,;:s@”]+)*)|(“.+”))@(([[0–9]{1,3}.[0–9]{1,3}.[0–9]{1,3}.[0–9]{1,3}])|(([a-zA-Z-0–9]+.)+[a-zA-Z]{2,}))$/",
                  })}
                />
                <small id="emailHelpId" class="form-text text-muted">
                  {errors.email && <p role="alert">{errors.email?.message}</p>}
                </small>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <small id="emailHelpId" class="form-text text-muted">
                  {errors.password && (
                    <p role="alert">{errors.password?.message}</p>
                  )}
                </small>
              </div>
              <div>
                {errorRequest && (
                  <div class="alert alert-danger" role="alert">
                    <strong>{errorRequest}</strong> ERROR
                  </div>
                )}
              </div>
              <div class="mb-3">
                <input type="submit" class="btn btn-success" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import routes from "./routes";
import Login from "./views/Login/Login";
import { Suspense } from "react";
import MyNavBar from "./componentes/Nav/MyNav";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./App.css";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <div className="App">
      {/* <PresupuestoComponent /> */}
      <BrowserRouter>
        <Suspense fallback={<div> Loaging..</div>}>
          <MyNavBar />
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />

            {routes.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element />}
                  />
                )
              );
            })}
            <Route path="/" element={<Navigate to="presupuesto" replace />} />

            <Route
              path="*"
              name="Home"
              element={
                <>
                  {" "}
                  <p>404</p>{" "}
                </>
              }
            />
          </Routes>
        </Suspense>
        
      </BrowserRouter>
      <Toaster />

    </div>
  );
}

export default App;

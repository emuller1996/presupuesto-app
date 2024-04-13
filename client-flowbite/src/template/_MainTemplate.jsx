import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../routes";
import AppAside from "../components/_AppAside";
import AppNavbar from "../components/_AppNavbar";

export default function MainTemplate() {
  return (
    <>
      <AppNavbar />

      <AppAside />

      <div className="p-4 sm:ml-64">
        <div className="p-2  border-gray-200  rounded-lg dark:border-gray-700 mt-14">
          <Suspense fallback={"load..."}>
            <Routes>
              {routes.map((route, idx) => {
                return (
                  route.element && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={true}
                      name={route.name}
                      element={<route.element />}
                    />
                  )
                );
              })}
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
}

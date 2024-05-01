import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../routes";
import AppAside from "../components/_AppAside";
import AppNavbar from "../components/_AppNavbar";
import AppBreadcrumb from "../components/_AppBreadcrumb";

export default function MainTemplate() {
  
  return (
    <>
      <AppNavbar />

      <AppAside />

      <div className="mt-[65px] md:mt-[57px] sm:ml-64 text-center">
       <AppBreadcrumb />
      </div>
      <div className="p-4 sm:ml-64">
        <div className="p-2  border-gray-200  rounded-lg dark:border-gray-700 ">
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

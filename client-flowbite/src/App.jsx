import "./App.css";
import MainTemplate from "./template/_MainTemplate";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RouteProtected from "./utils/proteccion/RouteProtected";
import LoginPage from "./pages/AuthPages/Login";
import RegisterPage from "./pages/AuthPages/Register";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" name="blue_login" element={<LoginPage />} />
            <Route
              path="/registrame"
              id="registrame"
              element={<RegisterPage />}
            />

            <Route
              path="/*"
              name="dashboard"
              element={
                <RouteProtected>
                  <MainTemplate></MainTemplate>
                </RouteProtected>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;

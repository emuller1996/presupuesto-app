import "./App.css";
import MainTemplate from "./template/_MainTemplate";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            name="dashboard"
            element={<MainTemplate></MainTemplate>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

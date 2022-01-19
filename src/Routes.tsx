import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Home" />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

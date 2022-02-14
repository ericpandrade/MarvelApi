import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authcontext";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/Login";

function Router() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Router;

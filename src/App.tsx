import "./styles/home.scss";

import { LandingPage } from "./pages/landingpage";
import { Route, Routes } from "react-router";
import { Dashboard } from "./pages/dashboard";
import { LoginPage } from "./pages/loginpage";
import { RegisterPage } from "./pages/registerpage";
import { MissingPage } from "./pages/missingpage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/*" element={<MissingPage />} />
    </Routes>
  );
}

export default App;

import "./styles/home.scss";

import { LandingPage } from "./pages/landingpage";
import { Route, Routes } from "react-router";
import { Dashboard } from "./pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;

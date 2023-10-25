import "./styles/home.scss";

import { LandingPage } from "./pages/landingpage";
import { Route, Routes } from "react-router";
import { Dashboard } from "./pages/dashboard";
import { LoginPage } from "./pages/loginpage";
import { RegisterPage } from "./pages/registerpage";
import { MissingPage } from "./pages/missingpage";
import { VotePage } from "./pages/votepage";
import { CreatePollPage } from "./pages/createpoll";
import { useEffect } from "react";
import { useUser } from "./components/user_context";
import axios from "axios";
import { ApiRoot } from "./utils/consts";

function App() {
  const user = useUser();

  const refreshConnection = async () => {
    axios
      .post(ApiRoot("users/refresh"))
      .then((res) => {
        user.tokens = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // Initial refresh when the component mounts
    refreshConnection();

    // Set up a recurring refresh every 10 minutes (600,000 milliseconds)
    const refreshInterval = 10 * 60 * 1000; // 10 minutes
    const refreshTimer = setInterval(() => {
      refreshConnection();
    }, refreshInterval);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(refreshTimer);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/create" element={<CreatePollPage poll_id={0} />} />
      <Route path="/poll/*" element={<VotePage poll_id={""} />} />
      <Route path="/*" element={<MissingPage />} />
    </Routes>
  );
}

export default App;

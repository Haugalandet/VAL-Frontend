import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Dashboard } from "./pages/dashboard";
import { LoginPage } from "./pages/loginpage";
import { RegisterPage } from "./pages/registerpage";
import { CreatePollPage } from "./pages/createpoll";
import { VotePage } from "./pages/votepage";
import { MissingPage } from "./pages/missingpage";
import { ViewPoll } from "./pages/viewPoll";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "dashboard/create",
    element: <CreatePollPage />,
  },
  {
    path: "/polls/:id/view",
    element: <ViewPoll />,
  },
  {
    path: "/polls/*",
    element: <VotePage />,
  },
  {
    path: "/*",
    element: <MissingPage />,
  },
]);

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

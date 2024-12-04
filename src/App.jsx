import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayoutBranding from "./components/Dashboard/Dashboard";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import { useState } from "react";
import SlotPropsSignIn from "./pages/Login";
import Logout from "./pages/Logout";
import SlotPropsSignUp from "../src/pages/Register";
import "./MyApp.css";

const App = () => {
  const [auth, setAuth] = useState(localStorage.getItem("Auth") === "true");

  const ProtectedRoute = ({ children }) => {
    if (auth) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  };

  if (auth) {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayoutBranding />
              </ProtectedRoute>
            }
          />


          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Navigate to={"/"} />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    );
  }

  // ------------------------------
  else {
    // Wenn der Benutzer nicht authentifiziert ist, leite ihn zur Login-Seite oder Logout-Route
    return (
      <Router>
        <Routes>
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<SlotPropsSignIn />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<SlotPropsSignUp />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    );
  }
};

export default App;

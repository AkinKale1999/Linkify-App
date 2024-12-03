import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayoutBranding from "./components/Dashboard/Dashboard";
import { useState, useEffect } from "react";
import SlotPropsSignIn from "./pages/Login";
import Logout from "./pages/Logout";
import "./MyApp.css";

const App = () => {
  const [auth, setAuth] = useState(localStorage.getItem("Auth") === "true");

  if (auth) {
    return (
      <Router>
        <Routes>
          {/* <Route path="/" element={<DashboardLayoutBranding />} /> */}
          <Route path="/dashboard" element={<DashboardLayoutBranding />} />
          <Route path="/" element={<Navigate to="/Dashboard" />}/>
        </Routes>
      </Router>
    );
  } else {
    // Wenn der Benutzer nicht authentifiziert ist, leite ihn zur Login-Seite oder Logout-Route
    return (
      <Router>
        <Routes>
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<SlotPropsSignIn />} />
        </Routes>
      </Router>
    );
  }
};

export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayoutBasic from "../pages/Dashboard";
import TablePage from "../components/User/TablePage";
import EditPage from "../components/User/EditPage";
import SlotPropsSignIn from "../pages/Login";
import SlotPropsSignUp from "../pages/Register";
import NotFoundPage from "../pages/NotFoundPage";
import Logout from "../pages/Logout";
import CreatePage from "../components/User/CreatePage";
import { useEffect } from "react";
import ProfilePage from "../components/User/ProfileEdit";

const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

// ---------------------------------------

const ProtectedRoute = ({ children }) => {
  if (isAuthenticated()) {
    return children;
  } else {
    return <Navigate to="/Login" />;
  }
};
// ---------------------------------------

function AppRouter() {
  // ---------------------------------------
  // useEffect(() => {
  //   const detectDevTools = () => {
  //     const threshold = 160; // Schwelle für die Breite/Höhe der Entwicklerwerkzeuge
  //     const width = window.outerWidth - window.innerWidth > threshold;
  //     const height = window.outerHeight - window.innerHeight > threshold;
  //     if (width || height) {
  //       alert("Bitte die Entwicklerkonsole schließen!");
  //       window.location.reload();
  //     }
  //   };
  //   const interval = setInterval(detectDevTools, 1000);

  //   // Cleanup-Function für das Intervall
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <Router>
      <Routes>
        {/* Weiterleitung von "/" nach "/Dashboard" */}
        <Route path="/" element={<Navigate to="/Dashboard" />} />

        {/* Geschützte Routen */}
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayoutBasic />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Liste"
          element={
            <ProtectedRoute>
              <TablePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Liste/create"
          element={
            <ProtectedRoute>
              <CreatePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Profilseite"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Liste/edit/:id"
          element={
            <ProtectedRoute>
              <EditPage />
            </ProtectedRoute>
          }
        />

        {/* Öffentliche Routen */}
        <Route path="/Login" element={<SlotPropsSignIn />} />
        <Route path="/Register" element={<SlotPropsSignUp />} />
        <Route path="/Logout" element={<Logout />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;

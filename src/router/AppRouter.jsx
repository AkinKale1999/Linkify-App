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

const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

const ProtectedRoute = ({ children }) => {
  if (isAuthenticated()) {
    return children;
  } else {
    return <Navigate to="/Login" />;
  }
};

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Weiterleitung von "/" nach "/Dashboard" */}
        <Route path="/" element={<Navigate to="/Dashboard" />} />

        <Route path="/Logout" element={<Logout />} />

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

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;

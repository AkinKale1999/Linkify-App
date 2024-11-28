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
import ProfilePage from "../components/User/ProfileEdit";

// Prüfe Authentifizierung
const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

// Geschützte Route-Komponente
const ProtectedRoute = ({ children }) => {
  if (isAuthenticated()) {
    return children;
  } else {
    return <Navigate to="/Login" />;
  }
};

// Layout für geschützte Routen
const ProtectedLayout = ({ children }) => {
  return (
    <div id="alles">
      <div id="header">
        <div id="burgermenuBtn">burgermenuBtn *</div>
        <div id="logo">Logo +</div>
        <div id="darkmode">darkmode *</div>
        <div id="profileBtn">profileBtn +</div>
      </div>
      <div id="navbar">navbar *</div>
      <div id="content-bereich">{children}</div>
      <div id="footer">footer *</div>
    </div>
  );
};

function AppRouter() {
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
              <ProtectedLayout>
                <DashboardLayoutBasic />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Liste"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <TablePage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Liste/create"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <CreatePage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Profilseite"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <ProfilePage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/Liste/edit/:id"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <EditPage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* Öffentliche Routen */}
        <Route path="/Login" element={<SlotPropsSignIn />} />
        <Route path="/Register" element={<SlotPropsSignUp />} />
        <Route path="/Logout" element={<Logout />} />

        {/* 404 Seite */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;

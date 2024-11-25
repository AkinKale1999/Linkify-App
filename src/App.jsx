import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TablePage from "./components/User/TablePage";
import EditPage from "./components/User/EditPage";
import SlotPropsSignIn from "./pages/Login";
import DashboardLayoutBasic from "./pages/Dashboard.jsx";
import SlotPropsSignUp from "./pages/Register.jsx";
import AppRouter from "./router/AppRouter.jsx";

const App = () => {
  return (
    <Router>
      <AppRouter />
      <Routes>
        <Route path="/Liste" element={<TablePage />} />
        <Route path="/Liste/edit/:id" element={<EditPage />} />
        <Route path="/Login" element={<SlotPropsSignIn />} />
        <Route path="/Dashboard" element={<DashboardLayoutBasic />} />
        <Route path="/Register" element={<SlotPropsSignUp />} />
      </Routes>
    </Router>
  );
};

export default App;

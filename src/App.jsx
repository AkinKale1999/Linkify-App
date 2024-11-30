import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayoutBranding from "./components/Dashboard/Dashboard";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";

const App = () => {
  if (localStorage.getItem("isAuthenticated") === "true") {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<DashboardLayoutBranding />} />
            <Route path="/dashboard" element={<DashboardLayoutBranding />} />

            {/* <Route path="/user-list" element={<DashboardLayoutBranding />} /> */}

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </>
    );
  } else {
    return <div>TRUE</div>;
  }
};

export default App;

import { Route, Routes, Navigate } from "react-router-dom";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Login" />} />
    </Routes>
  );
}

export default AppRouter;

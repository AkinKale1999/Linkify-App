import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Logout: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div style={{}}>
      <LogoutIcon
        onClick={handleLogout}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default Logout;

import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Logout: React.FC = () => {
  const router = useRouter();

  return (
    <div style={{}}>
      <LogoutIcon style={{ cursor: "pointer" }} />
    </div>
  );
};

export default Logout;

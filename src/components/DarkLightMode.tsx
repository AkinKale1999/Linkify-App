import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useState } from "react";

export default function ChangeMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        right: 20,
        display: "flex",
        justifyContent: "flex-end",
        cursor: "pointer",
      }}
      onClick={() => setIsDarkMode((prevMode) => !prevMode)}
    >
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </div>
  );
}

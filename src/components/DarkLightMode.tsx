import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useState } from "react";

export default function ChangeMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;

      // Setze die globale Klasse
      const bodyClass = newMode ? "dark-mode" : "light-mode";
      document.body.className = bodyClass;

      return newMode;
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        right: 20,
        display: "flex",
        justifyContent: "flex-end",
        cursor: "pointer",
      }}
      onClick={toggleDarkMode}
    >
      {isDarkMode ? (
        <LightModeIcon
          style={{ color: "#fff", width: "30px", height: "40px" }}
        />
      ) : (
        <DarkModeIcon
          style={{ color: "#1976d2", width: "30px", height: "40px" }}
        />
      )}
    </div>
  );
}

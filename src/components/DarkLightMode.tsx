import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useState } from "react";

export default function ChangeMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;

      const headerFooterBackgroundColor = newMode ? "#000" : "#1976d2";
      const headerFooterTextColor = newMode ? "#fff" : "#fff";

      const footer = document.querySelector("footer");
      const header = document.querySelector("header");
      if (footer) {
        footer.style.backgroundColor = headerFooterBackgroundColor;
        footer.style.color = headerFooterTextColor;
      }
      if (header) {
        header.style.backgroundColor = headerFooterBackgroundColor;
        header.style.color = headerFooterTextColor;
      }

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
        <LightModeIcon style={{ color: "#fff" }} />
      ) : (
        <DarkModeIcon style={{ color: "#fff" }} />
      )}
    </div>
  );
}

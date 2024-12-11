import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useState } from "react";

export default function ChangeMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);

    // Farben definieren
    const bodyBackgroundColor = !isDarkMode ? "#000" : "#fff";
    const bodyTextColor = !isDarkMode ? "#fff" : "#000";
    const headerFooterBackgroundColor = isDarkMode ? "#1976d2" : "#000"; // Blau für LightMode, Weiß für DarkMode
    const headerFooterTextColor = "#fff"; // Weiß für DarkMode, Schwarz für LightMode

    // Body und HTML Hintergrund- und Textfarbe setzen
    document.documentElement.style.backgroundColor = bodyBackgroundColor; // <html>
    document.body.style.backgroundColor = bodyBackgroundColor; // <body>
    document.body.style.color = bodyTextColor; // Textfarbe im Body

    // Footer und Header bearbeiten
    const footer = document.querySelector("footer");
    const header = document.querySelector("header");
    if (footer) {
      footer.style.backgroundColor = headerFooterBackgroundColor;
      footer.style.color = headerFooterTextColor; // Textfarbe in Footer
    }
    if (header) {
      header.style.backgroundColor = headerFooterBackgroundColor;
      header.style.color = headerFooterTextColor; // Textfarbe in Header
    }
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
      {/* DarkModeIcon immer weiß und LightModeIcon immer schwarz */}
      {isDarkMode ? (
        <LightModeIcon style={{ color: "#fff" }} /> // Immer schwarz
      ) : (
        <DarkModeIcon style={{ color: "#fff" }} /> // Immer weiß
      )}
    </div>
  );
}

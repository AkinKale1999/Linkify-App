"use client";

import IconButton from "@mui/material/IconButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useRef, useState } from "react";

export default function Arrow({ isDarkMode }) {
  const handleIconPosition = useRef(null);
  const halfCircle = useRef(null);
  const [isArrowUp, setIsArrowUp] = useState(false);

  const handleIconClick = () => {
    setIsArrowUp((prev) => !prev);

    const appBarElement = document.querySelector("header");

    if (appBarElement) {
      appBarElement.style.display = isArrowUp ? "block" : "none";
    }

    if (handleIconPosition.current) {
      halfCircle.current.style.rotate = isArrowUp ? "0deg" : "180deg";
      halfCircle.current.style.top = isArrowUp ? "25px" : "28px";
      handleIconPosition.current.style.top = isArrowUp ? "17px" : "-30px";
    }
  };

  return (
    <div id="ContainerDIV">
      <IconButton
        id="ArrowBTN"
        edge="end"
        color="inherit"
        ref={handleIconPosition}
        onClick={handleIconClick}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            id="halbkreis"
            ref={halfCircle}
            src="/img/Circle.svg"
            alt="Halbkreis"
            style={{
              filter: isDarkMode ? "invert(1)" : "none", // Dynamischer Stil
            }}
          />
        </div>
        {isArrowUp ? (
          <ArrowDownwardIcon style={{ color: isDarkMode ? "#fff" : "#000" }} />
        ) : (
          <ArrowUpwardIcon style={{ color: isDarkMode ? "#fff" : "#000" }} />
        )}
      </IconButton>
    </div>
  );
}

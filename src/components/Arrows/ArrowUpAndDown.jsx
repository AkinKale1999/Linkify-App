import IconButton from "@mui/material/IconButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useRef, useState } from "react";

export default function Arrow() {
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
      halfCircle.current.style.top = isArrowUp ? "10px" : "10px";
      handleIconPosition.current.style.top = isArrowUp ? "25px" : "-24px";
    }
  };


  // ccc
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
            src="/img/Halbkreis.png"
            alt="Halbkreis"
          />
        </div>
        {isArrowUp ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
      </IconButton>
    </div>
  );
}

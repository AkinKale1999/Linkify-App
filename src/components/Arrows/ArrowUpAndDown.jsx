import IconButton from "@mui/material/IconButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useRef, useState } from "react";

export default function Arrow() {
  const handleIconPosition = useRef(null);

  const handleIconClick = () => {
    setIsArrowUp((prev) => !prev);
    const appBarElement = document.querySelector(
      ".css-gr4hu4-MuiPaper-root-MuiAppBar-root"
    );
    if (handleIconPosition.current) {
      appBarElement.style.position = "absolute";
      appBarElement.style.top = isArrowUp ? "0px" : "-15px";
      handleIconPosition.current.style.top = isArrowUp ? "22px" : "15px";
    }
  };

  const [isArrowUp, setIsArrowUp] = useState(false);

  return (
    <div id="ContainerDIV">
      <IconButton
        id="ArrowBTN"
        edge="end"
        color="inherit"
        ref={handleIconPosition}
        onClick={handleIconClick}
      >
        {isArrowUp ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
      </IconButton>
    </div>
  );
}

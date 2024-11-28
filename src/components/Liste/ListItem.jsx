import React from "react";

// ListItem-Komponente
function ListItem({ myvalue, mytype = "text" }) {
  if (mytype === "text") {
    return <div>{myvalue}</div>; // Gibt den Wert als Text aus
  } else {
    return <div>Unbekanntes Typ</div>; // Gibt einen Fehlertext aus
  }
}

export default ListItem;

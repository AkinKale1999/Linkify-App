import React from "react";
import PropTypes from "prop-types"; // Korrekt importiert

// Liste-Komponente
function Liste({ mylist, mylabels }) {
  // Hier kannst du die Labels und User-Daten ausgeben oder anderweitig verarbeiten
  console.log("Labels:", mylabels);
  console.log("List:", mylist);

  return (
    <div>
      {mylist.map((listItem) => (
        <div key={listItem.id}>
          <p>
            {listItem.firstName} {listItem.lastName} - Alter: {listItem.age}
          </p>
        </div>
      ))}
    </div>
  );
}

Liste.propTypes = {
  mylist: PropTypes.array.isRequired,
  mylabels: PropTypes.array.isRequired,
};

export default Liste;

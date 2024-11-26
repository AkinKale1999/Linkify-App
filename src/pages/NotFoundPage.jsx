import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Seite nicht gefunden</h1>
      <p>Die angegebene URL existiert nicht.</p>
      <Link to="/">Z urück zur Startseite</Link>
    </div>
  );
};

export default NotFoundPage;

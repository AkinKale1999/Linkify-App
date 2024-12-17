"use client";
import React from "react";
export default function ImpressumPage() {
  return (
    <>
      <div className="container">
        {" "}
        {/* Container für zentrierten Inhalt */}
        <h1>Impressum</h1>
        <main>
          <div className="section">
            <h2>Angaben gemäß § 5 TMG (Telemediengesetz)</h2>
            <p>
              <strong>Firma:</strong>
              <br />
              [Ihr Firmenname]
              <br />
              [Ihre vollständige Adresse]
              <br />
              [PLZ, Ort]
            </p>
            <p>
              <strong>Vertreten durch:</strong>
              <br />
              [Ihr Name] (Geschäftsführer/Geschäftsführung)
            </p>
            <p>
              <strong>Kontakt:</strong>
              <br />
              Telefon: [Telefonnummer]
              <br />
              E-Mail:{" "}
              <a href={`mailto:[Ihre E-Mail-Adresse]`}>[Ihre E-Mail-Adresse]</a>
              <br />
              Webseite: <a href="[Ihre Webseite]">[Ihre Webseite]</a>
            </p>
            <p>
              <strong>Umsatzsteuer-Identifikationsnummer (USt-IdNr.):</strong>
              <br />
              [Ihre USt-IdNr., falls vorhanden]
            </p>
          </div>
          <div className="section">
            <h2>Rechtliche Hinweise</h2>
            <p>
              <strong>Verantwortlich für den Inhalt:</strong>
              <br />
              [Ihr Name], [Ihre Position]
            </p>
            <p>
              <strong>Redaktionell verantwortlich:</strong>
              <br />
              [Ihr Name]
            </p>
          </div>
          <div className="section">
            <h2>Haftungsausschluss</h2>
            <p>
              <strong>Haftung für Inhalte:</strong>
              <br />
              Die Inhalte dieser Webseite wurden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              kann jedoch keine Gewähr übernommen werden.
            </p>
            <p>
              <strong>Haftung für Links:</strong>
              <br />
              Unsere Webseite enthält Links zu externen Webseiten Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Für die Inhalte der
              verlinkten Seiten sind ausschließlich deren Betreiber
              verantwortlich.
            </p>
          </div>
          <div className="section">
            <h2>Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              dieser Webseite unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
          <div className="section">
            <h2>Datenschutz</h2>
            <p>
              Bitte beachten Sie unsere{" "}
              <a href="/datenschutz">Datenschutzerklärung</a>, die weitere
              Informationen zum Umgang mit Ihren personenbezogenen Daten
              enthält.
            </p>
          </div>
          <div className="section">
            <h2>Anwendbares Recht</h2>
            <p>Es gilt ausschließlich deutsches Recht.</p>
          </div>
        </main>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} [Ihr Firmenname]</p>
        </footer>
      </div>
    </>
  );
}
import React from 'react';
export default function InfoPage() {
  return (
    <>
      <h1>Willkommen bei Linkify</h1>
      <p>
        Wir sind ein dynamisches Team, das sich auf innovative Lösungen spezialisiert hat.
        Unsere Leidenschaft liegt darin, ...
      </p>
      <section className="about-us">
        <h2>Über uns</h2>
        <p>
          Hier kannst du mehr über unsere Geschichte, unsere Werte und unser Team erfahren.
          Wir sind stolz darauf, ...
        </p>
        <img src="/img/team.jpg" alt="Unser Team" />
      </section>
      <section className="our-services">
        <h2>Unsere Leistungen</h2>
        <ul>
          <li>Beratung</li>
          <li>Entwicklung</li>
          <li>Design</li>
        </ul>
        <p>
          Wir bieten maßgeschneiderte Lösungen für deine individuellen Bedürfnisse.
        </p>
      </section>
      <section className="contact">
        <h2>Kontakt</h2>
        <p>
          Du erreichst uns unter:
          <br />
          Telefon: +49 123 456 789
          <br />
          E-Mail: info@deinefirma.de
        </p>
        <a href="mailto:info@deinefirma.de" className="email-link">Schreibe uns!</a>
      </section>
      </>
  );
}
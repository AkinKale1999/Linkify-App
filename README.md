# Linkify

## Beschreibung

Linkify ist eine Webanwendung zur Verwaltung und Synchronisierung von Dokumenten.

## Features

- Benutzerauthentifizierung und -verwaltung
- Dokumentenliste mit Statusanzeige
- Dokumentensynchronisierung
- Profilverwaltung

## Technologien

### Frontend

- React
- CSS
- M-UI

### Backend

- Lumen (PHP Micro-Framework)
- MySQL
- Stripe API
- JWT (JSON Web Token)

### Infrastruktur & Deployment

- AWS
- Terraform

### Testing & Qualitätssicherung

- Selenium
- Jest
- PHPUnit

## Installation

### Voraussetzungen

- Visual Studio Code (VSC)
- Node.js & npm
- Composer
- PHP
- Git

### Schritte

1. Ordner erstellen: `mkdir Linkify`
2. In das Verzeichnis wechseln: `cd Linkify`
3. Lumen Projekt erstellen: `composer create-project --prefer-dist laravel/lumen Backend`
4. Frontend-Verzeichnis erstellen: `mkdir Frontend`
5. In das Frontend-Verzeichnis wechseln: `cd Frontend`
6. React App erstellen: `npx create-react-app .`
7. Frontend Abhängigkeiten installieren: `npm install -y`
8. Frontend starten: `npm start`
9. In das Backend-Verzeichnis wechseln: `cd ../Backend`
10. Backend starten: `php -S localhost:8000 -t public`

## Login Prozess

### Frontend Ablauf

1. Webseite laden: Die Webseite wird geladen und die Benutzeroberfläche angezeigt.
2. Login: Der Benutzer gibt E-Mail und Passwort ein und klickt auf "Login".
3. Anfrage senden: Eine JSON-Anfrage mit E-Mail und Passwort wird an die `/login` API gesendet.
4. Antwort verarbeiten: Bei Erfolg wird der Benutzer zur Profilseite oder zum Dashboard weitergeleitet. Bei Fehler wird eine Fehlermeldung angezeigt.

### Backend Ablauf

1. Anfrage empfangen: Lumen empfängt die POST-Anfrage an die `/login` Route.
2. Validierung: Die Eingaben (E-Mail und Passwort) werden validiert.
3. Benutzerdaten prüfen: Lumen verwendet Eloquent, um den Benutzer in der Datenbank zu finden und das Passwort zu überprüfen.
4. JWT generieren: Bei erfolgreicher Authentifizierung wird ein JWT generiert.
5. Antwort senden: Das JWT wird in der Antwort an das Frontend gesendet.

### Fehlerbehandlung

- **404 Fehler:** Benutzer nicht gefunden.
- **500 Fehler:** Serverfehler.
- **Validierung:** E-Mail, Passwortlänge, Passwortkomplexität.
- **Timeout:** Anfragezeit überschritten.

## GUI Beschreibung

### Login Page

- Eingabefelder: Username & Passwort
- Aktionen: Login, Passwort vergessen, Registrieren

### Dokumentenliste

- Anzeige: Tabelle mit `docid`, `ziel_dociid`, `quell_docID`, `status`.
- Aktionen: View, Mark-Delete

### Profilseite

- Eingabefelder: Username, Passwort, E-Mail, Adresse, Telefonnummern, Aktiv, Bezahlt bis, Geburtsdatum.

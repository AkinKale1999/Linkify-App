"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Importiere den Router aus Next.js

interface ProtectedRouteProps {
  children: React.ReactNode; // Erwartet, dass alle untergeordneten Elemente (children) als Prop übergeben werden
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter(); // Der Router wird verwendet, um Weiterleitungen durchzuführen

  useEffect(() => {
    // Hilfsfunktion zum Abrufen eines bestimmten Cookies
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`; // Greift auf alle Cookies zu
      const parts = value.split(`; ${name}=`); // Teilt die Cookie-Zeichenkette anhand des gesuchten Cookie-Namens
      if (parts.length === 2) return parts.pop()?.split(";").shift(); // Wenn der Cookie gefunden wird, gibt er den Wert zurück
      return null; // Wenn der Cookie nicht existiert, gibt null zurück
    };

    // Lese das Cookie "_CTA"
    const _CTA = getCookie("_CTA");

    // Hole den aktuellen Pfad (URL-Pfad) der Seite
    const currentPath = window.location.pathname;

    // Wenn das Cookie "_CTA" nicht existiert und der Benutzer nicht auf der Login-Seite ist,
    // leite zur Login-Seite weiter
    if (!_CTA && currentPath !== "/login") {
      router.push("/login"); // Weiterleitung zur Login-Seite
    }
    // Wenn das Cookie "_CTA" existiert und der Benutzer auf der Login-Seite ist,
    // leite zur Customer-Seite weiter
    else if (_CTA && currentPath === "/login") {
      router.push("/customer"); // Weiterleitung zur Customer-Seite
    }
  }, [router]); // Der useEffect Hook wird nur ausgelöst, wenn der Router sich ändert

  // Gib die Kinder (Content) der ProtectedRoute-Komponente aus
  return <>{children}</>;
};

export default ProtectedRoute;

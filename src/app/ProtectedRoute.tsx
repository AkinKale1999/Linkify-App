"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Importiere die js-cookie Bibliothek

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken"); // Lese den Token aus den Cookies
    const currentPath = window.location.pathname;

    if (!token && currentPath !== "/login") {
      // Wenn kein Token vorhanden ist, leite zur Login-Seite weiter
      router.push("/login");
    } else if (token && currentPath === "/login") {
      // Wenn ein Token vorhanden ist und der Benutzer auf der Login-Seite ist, leite zur Customer-Seite weiter
      router.push("/customer");
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;

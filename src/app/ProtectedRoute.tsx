"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift(); // Wenn der Cookie gefunden wird, gibt er den Wert zurück
      return null;
    };

    const _CTA = getCookie("_CTA");

    const currentPath = window.location.pathname;

    if (!_CTA && currentPath !== "/login") {
      router.push("/login");
    }

    else if (_CTA && currentPath === "/login") {
      router.push("/customer");
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;

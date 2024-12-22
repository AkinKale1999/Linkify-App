"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("Auth");
    const currentPath = window.location.pathname;

    if (auth !== "Authenticated" && currentPath !== "/login") {
      router.push("/login");
    } else if (auth === "Authenticated" && currentPath !== "/customer") {
      router.push("/customer");
    }
  }, [router]);


  return <>{children}</>;
};

export default ProtectedRoute;
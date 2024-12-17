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

    if (auth !== "Authenticated") {
      router.push("/login");
    } else {
      router.push("/customer");
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;

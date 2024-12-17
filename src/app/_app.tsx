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

    // wenn auth ungleich Authenticated ist dann wird man IMMER
    // zu einer Nicht definierten URL vom Frontend zu /login weitergeleitet,
    // ansonsten wird man immer auf /customer weitergeleitet.

    if (auth !== "Authenticated") {
      router.push("/login");
    } else {
      router.push("/customer");
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;

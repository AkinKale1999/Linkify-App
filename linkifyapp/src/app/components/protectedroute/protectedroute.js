import { useRouter } from "next/router";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("Auth") === "true";

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;

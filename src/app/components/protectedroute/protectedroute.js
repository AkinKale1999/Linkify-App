import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("Auth");
    if (authStatus === "true") {
      setAuth(true);
    } else {
      setAuth(false);
      router.push("/login"); // Umleitung zur Login-Seite, wenn nicht authentifiziert
    }
  }, [router]);

  if (!auth) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
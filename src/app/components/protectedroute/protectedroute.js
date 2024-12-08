import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("Auth");
    if (authStatus === "true") {
      setAuth(true);
      router.push("/");
    } else {
      setAuth(false);
      router.push("/logout");
    }
  }, [router]);

  if (!auth) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

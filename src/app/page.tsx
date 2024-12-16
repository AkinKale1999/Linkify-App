"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function ProtectedRoute() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user === "user@my.com") {
      return router.push("/customer");
    } else {
      return router.push("/login");
    }
  }, []);
}

export default ProtectedRoute;

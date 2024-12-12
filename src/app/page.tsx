"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function ProtectedRoute() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user === "user@my.com") {
      router.push("/customer");
    } else {
      router.push("/login");
    }
  }, [router]);

  return null;
}

export default ProtectedRoute;

"use client";
import React, { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

  const token = localStorage.getItem("user");
  useLayoutEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div
      style={{
        position: "relative",
        left: "15%",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "75%",
      }}
    >
      <h1>Dashboard</h1>
      Hallo und herzlich willkommen, dass Sie sich bei Linkify registriert
      haben.
    </div>
  );
};

export default DashboardPage;

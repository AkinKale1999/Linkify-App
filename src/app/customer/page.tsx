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
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dolorum
      corporis quo dolorem dolores aperiam. Aut eaque ex temporibus, itaque
      ratione quod et vero id error laudantium voluptatum expedita, ut
      voluptate. Earum pariatur reiciendis deleniti eius voluptatem non maiores
      atque! Saepe incidunt sit aperiam culpa a harum ipsam amet esse.
    </div>
  );
};

export default DashboardPage;

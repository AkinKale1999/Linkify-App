"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation"; // Verwende useRouter von Next.js

export default function BackButton({ ButtonText = "Back" }) {
  const router = useRouter(); // Verwende useRouter von Next.js
  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      variant="contained"
      style={{
        backgroundColor: "var(--success-color)",
        color: "#fff",
        width: "var(--width-button)",
        height: "var(--height-button)",
      }}
      onClick={handleBack}
    >
      {ButtonText}
    </Button>
  );
}
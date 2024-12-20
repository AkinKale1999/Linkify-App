"use client";

import ChangeMode from "@/components/DarkLightMode";
import "../globals.css";
import ProtectedRoute from "./page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <>
        <html lang="en">
          <body
            style={{
              margin: "0",
              padding: "0",
              minHeight: "100vh",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "0",
                marginLeft: "60px",
                marginTop: "10px",
              }}
            >
              <ChangeMode />
            </div>
            {children}
          </body>
        </html>
      </>
    </ProtectedRoute>
  );
}

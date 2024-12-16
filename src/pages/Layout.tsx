"use client";
import Navigation from "../components/navigation";

export default function Layout({ children }) {
  return (
    <div>
      <Navigation />
      <main>{children}</main>
    </div>
  );
}
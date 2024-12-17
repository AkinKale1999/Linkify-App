"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./logo";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <Logo />
      </div>

      {/* Burger-Menü */}
      {isMobile && (
        <button
          className="burger-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      )}

      {/* Navigation */}
      <nav className={`main-navigation ${isMenuOpen && isMobile ? "open" : ""}`}>
        <ul className="nav-list">
          <li className="nav-item">
            
          </li>
          <li className="nav-item">
            <Link href="/technology" className="nav-link">
              Technology
            </Link>
          </li>
          <li className="nav-item login">
            <Link href="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item registrieren">
            <Link href="/registrieren" className="nav-link">
              Registrieren
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}


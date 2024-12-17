"use client";
import Link from "next/link";
export default function Navigation() {
  return (
    <header>
    <nav id="main-navigation">
      <ul className="nav-list">
        <li className="nav-item">
          <Link href="/info" className="nav-link">
            Info
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/datenschutz" className="nav-link">
            Datenschutz
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/impressum" className="nav-link">
            Impressum
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/kontakt" className="nav-link">
            Kontakt
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/technology" className="nav-link">
            Technology
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/uber-uns" className="nav-link">
            Über uns
          </Link>
        </li>
      </ul>
    </nav>
    </header>
  );
}
"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <ul className="footer-links">
        <li>
          <Link href="/impressum">Impressum</Link>
        </li>
        <li>
          <Link href="/kontakt">Kontakt</Link>
        </li>
        <li>
          <Link href="/uber-uns">Über uns</Link>
        </li>
        <li>
          <Link href="/datenschutz">Datenschutz</Link>
        </li>
      </ul>
    </footer>
  );
}



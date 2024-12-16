"use client";
import Link from "next/link";
import Layout from "../pages/layout";

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/info">Info</Link>
        </li>
        <li>
          <Link href="/datenschutz">Datenschutz</Link>
        </li>
        <li>
          <Link href="/impressum">Impressum</Link>
        </li>
        <li>
          <Link href="/kontakt">Kontakt</Link>
        </li>
        <li>
          <Link href="/technology">Technology</Link>
        </li>
        <li>
          <Link href="/uber-uns">Über uns</Link>
        </li>
      </ul>
    </nav>
  );
}
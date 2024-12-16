"use client"; // Korrekte Platzierung der Direktive

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyApp() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/") {
      router.push("/info");
    }
  }, [pathname, router]);

  return <h1>Linkify</h1>;
}
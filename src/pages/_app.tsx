"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Layout from "./layout";

export default function MyApp({ Component, pageProps }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/") {
      router.push("/info");
    }
  }, [pathname, router]);

  return (
    
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
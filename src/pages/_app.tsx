"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Navigation from "../components/navigation";
import { AppProps } from "next/app";
import "./styles/globals.css";
import Footer from "../components/footer";
export default function MyApp({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (pathname === "/") {
      router.push("/info");
    }
  }, [pathname, router]);
  return (
    <>
      <Navigation /> 
         <Component {...pageProps} />
      <Footer/>
    </>
  );
}
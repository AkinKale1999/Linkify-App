import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#F8D7DA",
      }}
    >
      <h1>404 Not Found</h1>
      <Link href="/login">Zurück zum Login</Link>
    </div>
  );
}

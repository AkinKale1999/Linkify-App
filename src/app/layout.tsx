export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          margin: "0",
          padding: "0",
          minHeight:"100vh"
        }}
      >
        {children}
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          height: "100%",
          minHeight: "100%",
          width: "100%",
        }}
      >
        {children}
      </body>
    </html>
  );
}

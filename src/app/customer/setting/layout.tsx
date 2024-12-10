// app/about/layout.tsx
export default function AboutLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div>

        <div>{children}</div>
      </div>
    );
  }
  
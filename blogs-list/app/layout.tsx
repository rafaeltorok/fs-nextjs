import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <Link href="/">Home</Link>
          {" | "}
          <Link href="/blogs">Blogs</Link>
          {" | "}
          <Link href="/blogs/new">Add blog</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}

import "./globals.css";
import Navbar from "./components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <div className="container">

        <Navbar />
          <div className="content">{children}</div>
        </div>
      </body>
    </html>
  );
}

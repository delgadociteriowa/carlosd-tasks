import type { Metadata } from "next";
import "./globals.css";
import  Providers from "./providers";

export const metadata: Metadata = {
  title: "Reto de Codificación",
  description: "Sistema de Gestión de Tareas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body>
          {children}
        </body>
      </Providers>
    </html>
  );
}

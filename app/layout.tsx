"use client";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { checkPublickRoute } from "./Auth/app-routes";
import { PrivateRoute } from "./Auth/auth";
import { Providers } from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pageName = usePathname();
  const routerIsPublic = checkPublickRoute(pageName!);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {routerIsPublic && children}
          {!routerIsPublic && <PrivateRoute>{children}</PrivateRoute>}
        </Providers>
      </body>
    </html>
  );
}

import "../styles/globals.css"
import "../styles/buttons.css";
import "../styles/loading.css";
import type { Metadata } from "next";
import Providers from "./Providers";
import GlobalNav from "../components/ui/GlobalNav";

export const metadata: Metadata = {
  title: "Andamio",
  description: "Welcome to Andamio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex flex-col">
              <GlobalNav />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

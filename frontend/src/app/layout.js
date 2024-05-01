import { Montserrat } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/layouts/navbar";
import { Providers } from "./providers";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Infinite Insights",
  description: "Expand Your Mind With Infinite Insights",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <Providers>
          <NavigationBar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

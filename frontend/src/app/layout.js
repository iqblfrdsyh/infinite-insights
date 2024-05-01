import { Montserrat } from "next/font/google";
import "./globals.css";
import { MyLayout } from "./MyLayout";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Infinite Insights",
  description: "Expand Your Mind With Infinite Insights",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} h-[100vh]`}>
        <MyLayout>
          <main>{children}</main>
        </MyLayout>
      </body>
    </html>
  );
}

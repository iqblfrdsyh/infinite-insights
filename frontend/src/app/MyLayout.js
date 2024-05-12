"use client";

import Footer from "@/components/layouts/footer";
import NavigationBar from "@/components/layouts/navbar";
import { NextUIProvider } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export function MyLayout({ children }) {
  const router = usePathname();
  const pathname = router;

  const isLoginPage = pathname === "/login" || pathname === "/regist";

  return (
    <NextUIProvider>
      {!isLoginPage && <NavigationBar />}
      <main
        className={
          isLoginPage ? "" : "mx-auto px-5 sm:px-10 mw:w-[1340px] sm:w-[100%]"
        }
      >
        {children}
      </main>
      {!isLoginPage && <Footer />}
    </NextUIProvider>
  );
}

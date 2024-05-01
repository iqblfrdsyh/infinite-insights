"use client";

import NavigationBar from "@/components/layouts/navbar";
import { NextUIProvider } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export function MyLayout({ children }) {
  const router = usePathname();
  const pathname = router;

  const isLoginPage = pathname === "/login" || pathname === "/signup";

  return (
    <NextUIProvider>
      {!isLoginPage && <NavigationBar />}
      {children}
    </NextUIProvider>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { logout, refreshToken } from "@/libs/api-libs";
import { jwtDecode } from "jwt-decode";
import DropdownUser from "@/components/dropdown";
import BaseButton from "@/components/button";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [decoded, setDecoded] = useState();

  const router = useRouter();
  const pathname = usePathname();

  const getToken = async () => {
    try {
      const data = await refreshToken("token");
      localStorage.setItem("token", data.accessToken);
      const decoded = jwtDecode(data.accessToken);
      setDecoded(decoded);
      localStorage.setItem("expire", decoded.exp);
      setIsLogin(true);
    } catch (error) {
      if (error.response) {
        setIsLogin(false);
        router.push("/login");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout("user/logout");
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [isLogin]);

  const variants = ["underlined"];

  const menuItems = ["Profile", "My Blog", "Log Out"];

  return (
    <div className="sticky top-0 z-50">
      <Navbar
        isBordered
        isBlurred={false}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="sm:px-[25px]"
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <Image
              src="/assets/images/logo.png"
              alt="logo infinite"
              width={30}
              height={30}
            />
            <p
              className="font-extrabold text-inherit ms-2"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Insights
            </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <Image
              src="/assets/images/logo.png"
              alt="logo infinite"
              width={50}
              height={50}
            />
            <p
              className="font-extrabold text-[28px] ms-2"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Insights
            </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          <NavbarItem  className="hidden sm:flex items-center gap-1 cursor-pointer ">
            <Link href="/">Home</Link>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex items-center gap-1 cursor-pointer ">
            <Link href="#">Search</Link>
            <IoSearch className="text-[20px]" />
          </NavbarItem>
          {isLogin ? (
            <DropdownUser
              imageSrc="/assets/images/person.png"
              alt="person"
              username={decoded.username}
              fullname={decoded.fullname}
              onclick={handleLogout}
            />
          ) : (
            <BaseButton
              variant="bordered"
              className="border-[#69C06D] text-inherit font-semibold text-black"
              title="Guest"
            >
              <Image
                src="/assets/images/person.png"
                alt="person"
                width={25}
                height={25}
              />
            </BaseButton>
          )}
        </NavbarContent>

        <NavbarMenu className="z-50">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <Link href="#">Search</Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
      {pathname === "/profile" ? null : (
        <div className="w-full flex flex-wrap gap-20 justify-center pt-3 bg-white overflow-x-auto max-w-full">
          {variants.map((variant, index) => (
            <Tabs variant={variant} key={index}>
              <Tab className="text-lg" key="sport" title="Sport" />
              <Tab className="text-lg" key="music" title="Music" />
              <Tab className="text-lg" key="artist" title="Artis" />
              <Tab className="text-lg" key="photos0" title="Photos" />
              <Tab className="text-lg" key="music0" title="Music" />
              <Tab className="text-lg" key="videos0" title="Videos" />
              <Tab className="text-lg" key="photos1" title="Photos" />
              <Tab className="text-lg" key="music1" title="Music" />
              <Tab className="text-lg" key="videos1" title="Videos" />
              <Tab className="text-lg" key="photos2" title="Photos" />
              <Tab className="text-lg" key="music2" title="Music" />
              <Tab className="text-lg" key="videos2" title="Videos" />
              <Tab className="text-lg" key="photos3" title="Photos" />
              <Tab className="text-lg" key="music3" title="Music" />
              <Tab className="text-lg" key="videos3" title="Videos" />
            </Tabs>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavigationBar;

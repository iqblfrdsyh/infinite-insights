"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const variants = ["underlined"];

  const menuItems = ["Profile", "My Blog", "Log Out"];

  return (
    <div className="sticky top-0 z-50">
      <Navbar
        isBordered
        isBlurred={false}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="px-[25px]"
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            {/* <AcmeLogo /> */}
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
          <NavbarItem className="hidden sm:flex items-center gap-1 cursor-pointer ">
            <Link href="#">Search</Link>
            <IoSearch className="text-[20px]" />
          </NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button variant="bordered" className="border-[#69C06D]">
                <Image
                  src="/assets/images/person.png"
                  alt="person"
                  width={25}
                  height={25}
                />
                <p className="text-inherit font-semibold text-black">Citra</p>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
      <div className="w-full flex flex-wrap gap-20 justify-center pt-3 bg-white overflow-x-auto max-w-full">
        {variants.map((variant,index) => (
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
    </div>
  );
};

export default NavigationBar;

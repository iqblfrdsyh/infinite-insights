"use client"; // gtw pastinya buat apa, tapi kalo ga dikasih ntr error

import React, { useEffect, useState } from "react"; //USE EFFECT BIAR GA NGAMBIL MULU 
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
import { useRouter } from "next/navigation"; // INI BUAT REDIRECT KE PAGE LAIN
import { logout, refreshToken } from "@/libs/api-libs"; // NGAMBIL DI LIBRARY API
import { jwtDecode } from "jwt-decode"; // BUAT DEKODE IN TOKEN
import { dataCategory } from "@/data/category";
import DropdownUser from "@/components/dropdown";
import BaseButton from "@/components/button";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // INI BUAT NGE OPEN MENU, TAMPILAN AWAL FALSE JDI GA LGSNG KEBUKA
  const [isLogin, setIsLogin] = useState(false);
  const [decoded, setDecoded] = useState(); // NYIMPEN INFORMASI TOKEN PENGGUNA PAS LOGIN
  const router = useRouter(); // ANUIN ROUTER
  
  const variants = ["underlined"];
  const menuItems = ["Profile", "My Blog", "Log Out"];

  const getToken = async () => { // FUNGSI BIAR DPT TOKEN
    try {
      const data = await refreshToken("token"); // DAPETIN TOKEN TERBARU
      const decoded = jwtDecode(data.accessToken); // NGE DEKODE TOKEN AKSES TADI
      setDecoded(decoded); // BARU DISIMPEN KESINI
      setIsLogin(true); // KALO UDAH YAUDAH BERARTI UDH LOGIN
    } catch (error) {
      if (error.response) {
        setIsLogin(false); // KALO DIA GAGAL DIA BAKAL NGESET LOGINNYA GAGAL DN DIARAHIN KE PAGE LOGIN BUAT ULANG
        router.push("/login");
      }
    }
  };

  const handleLogout = async () => { // NI FUNCTION BUAT NGEHANDLE LOGOUT
    try {
      await logout("user/logout"); // DIA BAKAL LOGOUT AKUNNYA TRS LANGSUNG DIARAHIN KE HALAMAN LOGIN
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken(); // NI BUAT AMBIL TOKEN, PAKE USEEFFECT JDINYA AMBILNYA CUMA SEKALI
  }, [isLogin]);


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
      <div className="w-full flex flex-wrap  justify-center pt-3 bg-white overflow-x-auto max-w-full">
        {variants.map((variant,index) => ( // DIA NGE MAPPING ARRAY VARIANT DENGAN NGEBUAT PARAMETER VARIANT
        // TERUS DIA NGE SET ISI VARIANT TADI KE SINI BIAR VARIANT TAB NYA BISA KE UNDERLINED
          <Tabs variant={variant} key={index}> 
            {dataCategory.map((data) => ( // ABIS ITU DIA NGE MAPPING YANG DATA DUMMY CATEGORY DENGAN PARAM DATA
              <Tab className="text-lg" key={data.category} title={data.category} /> 
              // TERUS DIA MAU AMBIL DATA DARI DATA CATEGORY TAPI NGEPASIN PROPERTYNYA
            ))}
          </Tabs>
        ))}
      </div>
    </div>
  );
};

export default NavigationBar;

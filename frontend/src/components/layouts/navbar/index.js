import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Image,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { FiSearch } from "react-icons/fi";

const NavigationBar = () => {
  const variants = ["underlined"];

  return (
    <div className="sticky top-0 ">
      <Navbar className="pt-5 justify-between relative ">
        <NavbarContent justify="start" className="flex items-center">
          <NavbarBrand className="mr-4 ml-3 flex items-center">
            <Image src="./asset/logo.png" width={55} />
            <p className="hidden ml-1 sm:block font-bold text-3xl text-inherit">
              Insight
            </p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent as="div" className="absolute -end-[25rem]" justify="end">
          <Link href="#">
            <Input
              classNames={{
                base: "w-28 h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-transparant border-none",
              }}
              placeholder="Search"
              size="sm"
              startContent={<FiSearch size={18} />}
              type="search"
            />
          </Link>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className="flex border border-gray-500 w-auto h-10 rounded-full">
                <Avatar
                  as="button"
                  className="transition-transform my-auto ms-1"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
                <h2 className="font-bold text-md my-auto mx-2">Citra Ayu</h2>
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">Citra Ayu Setiabudi</p>
              </DropdownItem>
              <DropdownItem key="profile">My Profile</DropdownItem>
              <DropdownItem key="blog">My Blogs</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <div className="w-full flex flex-wrap gap-20 justify-center pt-3">
        {variants.map((variant) => (
          <Tabs variant={variant}>
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
}

export default NavigationBar
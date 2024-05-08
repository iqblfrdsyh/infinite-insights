import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import Image from "next/image";

const DropdownUser = ({ username, fullname, imageSrc, alt, onclick }) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button variant="bordered" className="border-[#69C06D]">
          <Image src={imageSrc} alt={alt} width={25} height={25} />
          <p className="text-inherit font-semibold text-black">{username}</p>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="signedAs" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{fullname}</p>
        </DropdownItem>
        <DropdownItem key="profile" color="default" href="/profile">
          Profile
        </DropdownItem>
        <DropdownItem key="myblog" color="default">
          My Blog
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={onclick}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownUser;

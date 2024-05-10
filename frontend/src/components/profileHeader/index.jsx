import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const ProfileHeader = () => {
  return (
    <div>
      <div className="h-[230px] relative my-10">
        <Image
          src="/assets/images/banner/banner-profile.jpg"
          alt="banner-profile"
          fill={true}
          style={{ objectFit: "cover", filter: "brightness(40%)" }}
          className="rounded-lg"
        />
        <Avatar
          src="/assets/images/user.png"
          alt="user"
          isBordered
          color="default"
          className="absolute bottom-[-50px] left-10 h-[150px] w-[150px] bg-white p-5 shadow-lg"
        />
      </div>
    </div>
  );
};

export default ProfileHeader;

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
        <div className="flex gap-5 absolute bottom-[-50px] left-10 text-white">
          <Avatar
            src="/assets/images/user.png"
            alt="user"
            isBordered
            color="default"
            className=" h-[150px] w-[150px] bg-white p-5 shadow-lg"
          />
          <div className="flex flex-col py-[17px]">
            <p className="text-green-400 font-semibold opacity-90">Member</p>
            <h3 className="text-[35px] font-semibold">M Iqbal Ferdiansyah</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

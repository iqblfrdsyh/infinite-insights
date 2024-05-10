import { Image } from "@nextui-org/react";
import React from "react";

const ContentSwiper = ({ thumbnail, time, title }) => {
  const gradient = {
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: "2",
    width: "100%",
    height: "70%",
    backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), transparent)",
  };

  return (
    <div className="relative">
      <div style={gradient} className="rounded-b-lg"></div>
      <div className="">
        <Image
          src={thumbnail}
          alt="Article Image"
          className="rounded-lg object-cover h-[510px] w-[855px] -z-20"
          loading="lazy"
        />
        <div className="absolute bottom-8 left-8 right-32 text-white z-50">
          <p className="opacity-80 mb-3">{time}</p>
          <h3 className="w-full text-[27px] font-semibold">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default ContentSwiper;

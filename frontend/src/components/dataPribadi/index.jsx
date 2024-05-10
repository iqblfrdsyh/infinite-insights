import Image from "next/image";
import React from "react";

const DataPribadi = ({ user }) => {
  const data = [
    {
      title: "Nama Lengkap",
      text: user?.fullname || "–",
      icon: "/assets/images/icons/user.png",
    },
    {
      title: "Username",
      text: user?.username || "–",
      icon: "/assets/images/icons/idCard.png",
    },
    {
      title: "Headline",
      text: user?.headline || "–",
      icon: "/assets/images/icons/headline.png",
    },
  ];

  return (
    <div className="flex flex-col gap-7">
      {data.map((data, index) => (
        <figure className="flex items-center gap-5" key={index}>
          <Image src={data.icon} alt="icon" width={28} height={28} />
          <figcaption>
            <h3 className="font-semibold text-[23px]">{data.title}</h3>
            <p className="text-[18px]">{data.text}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
};

export default DataPribadi;

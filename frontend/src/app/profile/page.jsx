"use client";

import Cards from "@/components/cards";
import DataPribadi from "@/components/dataPribadi";
import ProfileHeader from "@/components/profileHeader";
import { dataUser } from "@/data/dataUser";
import { getUser, refreshToken } from "@/libs/api-libs";
import React, { useEffect, useState } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import BaseButton from "@/components/button";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  const fetchData = async () => {
    try {
      const token = await refreshToken("token");

      if (token) {
        const data = await getUser("user/me", token.accessToken);
        setUserData(data);
      } else {
        throw new Error("No refreshToken found");
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <ProfileHeader />
      <section className="my-10 mt-[60px] flex gap-10">
        <div className="w-[65%]">
          <h2 className="font-semibold text-[30px] mb-[32px]">Data Pribadi</h2>
          <DataPribadi user={userData?.user} />
        </div>
        <div className="w-[35%]">
          <h2 className="font-semibold text-[30px] mb-[32px]">
            My Recent Post
          </h2>
          <ScrollShadow
            hideScrollBar
            size={50}
            className="flex flex-col gap-4 h-[300px] "
          >
            {dataUser[0].blogs.map((data, index) => (
              <Cards.CardMyRecentPost article={data} key={index} />
            ))}
          </ScrollShadow>
        </div>
      </section>
      <hr className="border-2 border-gray-500 w-[65%] mx-auto my-16" />
      <section>
        <h2 className="font-semibold text-[32px] mb-[20px] text-center">
          My <span className="text-green-700">Blogs</span>
        </h2>
        <div className="flex justify-end my-10">
          <BaseButton title="Create New Blog" color="primary" radius="sm" />
        </div>
        <div className="flex flex-wrap gap-10 justify-center">
          {dataUser[0].blogs.map((data, index) => (
            <div>
              <Cards.CardBlogUser article={data} key={index} />
            </div>
          ))}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Profile;

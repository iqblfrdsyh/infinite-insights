"use client";

import React, { useEffect, useState } from "react";
import BaseButton from "@/components/button";
import Link from "next/link";
import { dataBlog } from "@/data/blog";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import ArticleCard from "@/components/artikelCard";
import SwiperComponent from "@/components/swiper";

const Home = () => {
  const fourArticles = dataBlog.slice(0, 4);

  return (
    <section>
      {/* <h2 className="text-[30px] text-center my-5">Infinite Insights</h2>
      <div className="flex gap-4 flex-wrap justify-center">
        {dataBlog.map((blog) => (
          <Link href={`/viewBlog/${blog.id}`}>
            <BaseButton
              radius="sm"
              size="md"
              color="primary"
              title={`To Blog Id ${blog.id}`}
            />
          </Link>
        ))}
      </div> */}

      {/* header */}
      <div className="header flex h-[90] mx-auto mt-6 rounded-xl bg-[#56a377] ps-[50px]">
        <div className="w-1/2 text-white">
          <h1 className="text-6xl font-bold mt-32">Infinite Insights</h1>
          <h6 className="ms-1 mt-2 text-lg">
            Expand Your Mind with Infinite Insights
          </h6>
          <Button className="mt-5 text-white border-2" color="white" variant="bordered">
            Learn More
          </Button>
        </div>
        <div className="w-1/2 h-full pt-16 ">
          <Image
            className=""
            width={600}
            height={100}
            src="/assets/images/header.png"
          />
        </div>
      </div>
      {/* end header */}

      {/* section 1 */}
      <div className="mt-20 h-[35rem] mb-20 pe-4 flex items-center mx-auto ">
        <div className="one w-2/3 relative">  
          <SwiperComponent />
        </div>
        <div className="two w-1/2">
          {fourArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
      {/* end section 1 */}

      {/* section 2 */}
      <div className="h-[35rem] mt-20 mx-auto bg-yellow-300">
        <div className="flex w-full h-32 bg-green-500"></div>
        <div className=""></div>
      </div>
      {/* end section 2 */}
    </section>
  );
};

export default Home;

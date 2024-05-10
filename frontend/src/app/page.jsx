"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { dataBlog } from "@/data/blog";
import SwiperComponent from "@/components/swiper";
import Cards from "@/components/cards";

const Home = () => {
  const fourArticles = dataBlog.slice(0, 4);

  return (
    <section>
      {/* header */}
      <div className="header flex h-[90] mx-auto mt-6 rounded-xl bg-[#56a377] ps-[50px]">
        <div className="w-1/2 text-white">
          <h1 className="text-6xl font-bold mt-32">Infinite Insights</h1>
          <h6 className="ms-1 mt-2 text-lg">
            Expand Your Mind with Infinite Insights
          </h6>
          <Button
            className="mt-5 text-white border-2"
            color="white"
            variant="bordered"
          >
            Learn More
          </Button>
        </div>
        <div className="w-1/2 h-full pt-16 ">
          <Image width={600} height={100} src="/assets/images/header.png" />
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
            <Cards.CardArticleHorizon key={article.id} article={article} />
          ))}
        </div>
      </div>
      {/* end section 1 */}

      {/* section 2 */}
      <div className="h-[35rem] flex mt-20 gap-7">
        <div className="w-[65%] backdrop:h-full ">
          <div className="w-full h-20 ">
            <div className="flex w-full justify-between">
              <h1 className="text-3xl h-14 border-b-5 border-gray-500 font-extrabold">
                Recomendation
              </h1>
              <Link href="#" className="hover:underline">
                <h2 className="font-medium text-lg flex mt-4 ">
                  Selengkapnya <IoChevronForwardOutline className="mt-1.5" />
                </h2>
              </Link>
            </div>
            <hr
              style={{
                backgroundColor: "#E5E7EB",
                height: "3px",
                border: "none",
              }}
            />
          </div>
          <div className="flex flex-wrap-reverse justify-between gap-10 items-center">
            {fourArticles.map((article) => (
              <Cards.CardArticle key={article.id} article={article} />
            ))}
          </div>
        </div>
        <div className="w-[35%] h-full">
          <div className="w-full h-20">
            <div className="flex w-full">
              <h1 className="text-3xl h-14 border-b-5 border-gray-500 font-extrabold">
                Popular
              </h1>
            </div>
            <hr
              style={{
                backgroundColor: "#E5E7EB",
                height: "3px",
                border: "none",
              }}
            />
          </div>
        </div>
      </div>
      {/* end section 2 */}
    </section>
  );
};

export default Home;

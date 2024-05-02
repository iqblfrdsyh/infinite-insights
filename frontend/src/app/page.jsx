import React from "react";
import BaseButton from "@/components/button";
import Link from "next/link";
import { dataBlog } from "@/data/blog";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/react";

const Home = () => {
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

      <div className="header flex w-[83rem] h-[90] mx-auto mt-10 rounded-xl bg-[#C2EADC] ps-24">
        <div className="w-1/2 border-black">
          <h1 className="text-6xl font-bold mt-32">Infinity Insight</h1>
          <h6 className="ms-1 mt-2 text-lg">Expand Your Mind with Infinite Insights</h6>
          <Button className="mt-5" color="success" variant="bordered">
            Learn More
          </Button>
        </div>
        <div className="w-1/2 h-full pt-16 ">
          <Image className="" width={600} src="/assets/images/header.png" />
        </div>
      </div>
    </section>
  );
};

export default Home;

import React from "react";
import BaseButton from "@/components/button";
import Link from "next/link";
import { dataBlog } from "@/data/blog";

const Home = () => {
  return (
    <section>
      <h2 className="text-[30px] text-center my-5">Infinite Insights</h2>
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
      </div>
    </section>
  );
};

export default Home;

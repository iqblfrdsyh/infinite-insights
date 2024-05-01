import BaseButton from "@/components/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <React.Fragment>
      <section>
        <div>Infinite Insights</div>
        <Link
          href="/contact"
          className="m-[50px] border-2 border-black rounded-md"
        >
          Contact
        </Link>
        <BaseButton />
      </section>
    </React.Fragment>
  );
};

export default Home;

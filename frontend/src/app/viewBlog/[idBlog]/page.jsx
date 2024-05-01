import BaseButton from "@/components/button";
import Link from "next/link";
import React from "react";

const ViewBlog = ({ params: { idBlog } }) => {
  return (
    <div className="my-5 mx-5">
      <Link href="/">
        <BaseButton
          title="Back to home"
          radius="sm"
          size="md"
          color="primary"
        />
      </Link>
      <h3 className="text-center mt-10">Id Blog : {idBlog}</h3>
    </div>
  );
};

export default ViewBlog;

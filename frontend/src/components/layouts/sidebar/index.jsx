import BaseButton from "@/components/button";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div className="w-[200px] h-[100vh]">
      <div className="flex flex-col gap-5 pt-10 text-center h-[100vh] w-full border-e-2">
        <Link href="/" className="font-semibold text-[18px]">
          Profile
        </Link>
        <Link href="/myblog" className="font-semibold text-[18px] opacity-50">
          My Blog
        </Link>
        <div>
          <BaseButton
            title="Logout"
            className="text-red-600 font-semibold text-[18px]"
            color="transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

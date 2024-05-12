import { Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
  IoLogoFacebook,
} from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-[#1b1b1b] text-white py-8 px-10 mt-48">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/assets/images/logo-white.png"
                alt="infinite-logo"
                className="w-[70px]"
              />
              <h2 className="text-4xl font-extrabold">infinity insights</h2>
            </div>
            <p className="text-left mb-6 text-xl">
              Expand Your Mind with Infinite Insights
            </p>
          </div>
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h4 className="text-lg font-semibold mb-2">Category :</h4>
              <ul className="list-none flex gap-7 list-inside">
                <div>
                  <li>Music</li>
                  <li>Sports</li>
                  <li>Artist</li>
                  <li>Life</li>
                  <li>Game</li>
                  <li>Politics</li>
                </div>
                <div>
                  <li>Music</li>
                  <li>Sports</li>
                  <li>Artist</li>
                  <li>Life</li>
                  <li>Game</li>
                  <li>Politics</li>
                </div>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Follow Us :</h4>
              <div className="flex space-x-4">
                <Link href="#">
                  <IoLogoInstagram className="text-2xl" />
                </Link>
                <Link href="#">
                  <IoLogoTwitter className="text-2xl" />
                </Link>
                <Link href="#">
                  <IoLogoYoutube className="text-2xl" />
                </Link>
                <Link href="#">
                  <IoLogoFacebook className="text-2xl" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-sm">
          &copy; {new Date().getFullYear()} infinity insight | All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

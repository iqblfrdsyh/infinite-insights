"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button, Image } from "@nextui-org/react";
import Link from "next/link";
import { signin } from "@/libs/api-libs";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const login = async (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    try {
      await signin("user/signin", data);
      router.push("/");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  return (
    <div className="h-screen flex">
      <div className="relative bg-white w-1/2 border-e-2 pe-10">
        <Image
          src="/assets/images/pentol.png"
          className="object-cover w-full h-full"
          alt="Gambar latar belakang"
        />
        <div className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center">
          <div className="text-center flex">
            <Image src="/assets/images/logo.png" className="me-3" />
            <h2 className="text-6xl font-nunito font-semibold">Insight</h2>
          </div>
          <div className="text-center mt-2">
            <h6>Expand Your Mind with Infinite Insights</h6>
          </div>
        </div>
      </div>
      <div className="w-1/2 content-center border">
        <h2 className="text-6xl font-bold text-center">Sign In</h2>
        <h5 className="text-center mt-2">
          Welcome, Login to access your account
        </h5>

        <form onSubmit={login}>
          <div className="w-96 mx-auto mt-20">
            <Input
              type="text"
              label="Username"
              variant="bordered"
              placeholder=""
              className="mb-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              type="text"
              label="Password"
              variant="bordered"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Link href="#">
              <h6 className="text-xs my-3 text-blue-400 hover:underline">
                Forgot Password?
              </h6>
            </Link>

            <Button
              type="submit"
              color="success"
              className="text-white w-full mt-10"
            >
              Sign in
            </Button>

            <h6 className="text-sm mt-5 font-medium text-center">
              Don't have an account?
              <Link
                href="/regist"
                className="text-sm ms-1 text-blue-400 hover:underline"
              >
                Sign Up
              </Link>
            </h6>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

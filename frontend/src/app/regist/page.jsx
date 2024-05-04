"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import { Input, Button,Image } from "@nextui-org/react";
import Link from "next/link";
=======
import { Input, Button, Image } from "@nextui-org/react";
import Link from "next/link";
import Swal from "sweetalert2";
import { signup } from "@/libs/api-libs";
>>>>>>> 8d3a9c472fe337a6f83fa31a22c599abeda295b8

const Regist = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

<<<<<<< HEAD
    const Register = async(e) =>{
      e.preventDefault();
      try {
        await axios.post("http://localhost:8080/user/signup", {
          fullname: nama,
          username: username,
          password: pass,
          confirmPassword: cpass,
=======
  const register = async (e) => {
    e.preventDefault();
    try {
      const data = {
        fullname,
        username,
        password,
        confirmPassword,
      };
      await signup("user/signup", data);
      router.push("/login");
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.msg,
>>>>>>> 8d3a9c472fe337a6f83fa31a22c599abeda295b8
        });
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
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <div className="text-center flex">
            <Image src="/assets/images/logo.png" className="me-2" />
            <h2 className="text-6xl font-nunito font-semibold">Insight</h2>
          </div>
          <div className="text-center mt-2">
            <h6>Expand Your Mind with Infinite Insights</h6>
          </div>
        </div>
      </div>
      <div className="w-1/2 content-center border">
        <h2 className="text-6xl font-bold text-center">Sign Up</h2>
        <h5 className="text-center mt-2">
          Create your account Infinite Insights
        </h5>

        <form onSubmit={register}>
          <div className="w-96 mx-auto mt-10">
            <Input
              type="text"
              label="Full Name"
              variant="bordered"
              placeholder=""
              className="mb-3"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
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
              className="mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              type="text"
              label="Confirm Password"
              variant="bordered"
              placeholder=""
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

<<<<<<< HEAD
            <Button type="submit" color="success" className="text-white w-full mt-10">
=======
            <Button
              color="success"
              type="submit"
              className="text-white w-full mt-10"
            >
>>>>>>> 8d3a9c472fe337a6f83fa31a22c599abeda295b8
              Create Account
            </Button>

            <h6 className="text-sm mt-5 font-medium text-center">
              have an account?
              <Link
                href="/login"
                className="text-sm ms-1 text-blue-400 hover:underline"
              >
                Sign in
              </Link>
            </h6>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Regist;

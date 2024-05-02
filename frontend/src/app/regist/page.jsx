import React from "react";
import { Input, Button, Link } from "@nextui-org/react";

const login = () => {
  return (
    <div className="h-screen flex">
      <div className="relative bg-white w-1/2 border-e-2 pe-10">
        <img
          src="./asset/pentol.png"
          className="object-cover w-full h-full"
          alt="Gambar latar belakang"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <div className="text-center flex">
            <img src="./asset/logo.png" className="me-2" />
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

        <div className="w-96 mx-auto mt-10">
          <Input
            type="text"
            label="Full Name"
            variant="bordered"
            placeholder=""
            className="mb-3"
          />
          <Input
            type="text"
            label="Username"
            variant="bordered"
            placeholder=""
            className="mb-3"
          />

          <Input
            type="text"
            label="Password"
            variant="bordered"
            placeholder=""
            className="mb-3"
          />

          <Input
            type="text"
            label="Confirm Password"
            variant="bordered"
            placeholder=""
          />

          <Button color="success" className="text-white w-full mt-10">
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
      </div>
    </div>
  );
};

export default login;

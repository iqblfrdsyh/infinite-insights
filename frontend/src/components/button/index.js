"use client";
import React from "react";

const BaseButton = () => {
  return (
    <button onClick={() => alert(`Hello Insights Friend, this base url api : ${process.env.NEXT_PUBLIC_BASE_URL}`)}>Click Me</button>
  );
};

export default BaseButton;

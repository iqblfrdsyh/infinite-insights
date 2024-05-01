"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const Contact = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      console.log(response);
      setData(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div>
      {data.map((x) => (
        <p>{x.title}</p>
      ))}
    </div>
  );
};

export default Contact;

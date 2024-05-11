"use client";

import BaseButton from "@/components/button";
import { CustomCheckbox } from "@/components/customCheckbox";
import InputFile from "@/components/inputFile";
import { dataCategory } from "@/data/category";
import { CheckboxGroup, Input, Textarea } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";

const CreateBlog = () => {
  const [groupSelected, setGroupSelected] = useState([]);

  return (
    <section>
      <div className="w-[70%] mx-auto p-4">
        <h2 className="my-7 text-[28px] font-semibold">
          What going in your mind?
        </h2>
        <form className="flex flex-col gap-4">
          <Input
            isRequired
            type="text"
            variant="bordered"
            placeholder="Enter the title blog"
            label="Title"
          />
          <Textarea
            isRequired
            variant="bordered"
            label="Content"
            labelPlacement="outside"
            placeholder="Enter your content blog"
            className="col-span-12 md:col-span-6 mb-6 md:mb-0"
          />
          <InputFile />
          <div className="flex flex-col gap-1 w-full">
            <CheckboxGroup
              isRequired
              className="gap-1"
              label="Select Categories"
              orientation="horizontal"
              value={groupSelected}
              onChange={setGroupSelected}
            >
              {dataCategory.map((data) => (
                <CustomCheckbox value={data.category} key={data.id}>
                  {data.category}
                </CustomCheckbox>
              ))}
            </CheckboxGroup>
            <p className="mt-4 ml-1">Selected: {groupSelected.join(", ")}</p>
          </div>
          <div className="flex gap-3 justify-end mt-8">
            <Link href="/profile">
              <BaseButton title="Cancel" color="danger" />
            </Link>
            <BaseButton type="submit" title="Create Blog" color="primary" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateBlog;

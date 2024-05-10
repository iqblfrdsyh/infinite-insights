import React from "react";
import Link from "next/link";
import { Card, CardBody, Image } from "@nextui-org/react";
import { BiTimeFive } from "react-icons/bi";
import { FaComment, FaAngleDoubleRight } from "react-icons/fa";
import { formatDate, truncateContent } from "@/libs/functions";
import BaseButton from "../button";

const Cards = {
  CardArticle: ({ article }) => {
    return (
      <Card className="w-[340px] h-[420px]">
        <Image
          className="object-cover w-full h-[230px] rounded-none"
          src={article.image}
        />
        <CardBody className="py-2">
          <div className="flex justify-between">
            <small className="text-default-500 flex">
              <span>
                <BiTimeFive className="me-1 h-full" />
              </span>
              {formatDate(article.time)}
            </small>
            <small className="text-default-500 flex">
              <span>
                <FaComment className="me-1 h-full" />
              </span>
              {article.commentar.length} Commentar
            </small>
          </div>
          <h4 className="font-bold text-xl mt-2">
            {truncateContent(article.title, 6)}
          </h4>
          <p className="text-sm mb-2">{truncateContent(article.content, 10)}</p>
          <Link href="#" className="hover:underline">
            <p className="font-medium text-medium mb-2 justify-end flex text-blue-500 items-center">
              Read More <FaAngleDoubleRight className="ms-1" />
            </p>
          </Link>
        </CardBody>
      </Card>
    );
  },
  CardArticleHorizon: ({ article }) => {
    return (
      <div className=" w-full">
        <div className=" h-28 m-4 flex items-center">
          <div>
            <Image
              src={article.image}
              alt="Article Image"
              className="rounded-lg object-cover h-28 w-28"
            />
          </div>
          <div className="w-2/3 ml-4">
            <h6 className="text-sm font-medium">{formatDate(article.time)}</h6>
            <h1 className="text-lg font-bold">{article.title}</h1>
          </div>
        </div>
      </div>
    );
  },
  CardMyRecentPost: ({ article }) => {
    return (
      <div className="border-2 shadow-md rounded-md  p-3 relative">
        <div className="mb-10">
          <h3 className="text-[23px] font-semibold">{article.title}</h3>
          <p className="font-medium opacity-50">
            {article.kategori.join(", ")}
          </p>
        </div>
        <div className="absolute bottom-3 right-3">
          <h5 className="font-medium">{formatDate(article.time)}</h5>
        </div>
      </div>
    );
  },
  CardBlogUser: ({ article }) => {
    return (
      <Card className="border-2 shadow-md w-[350px] rounded-lg relative">
        <CardBody>
          <div className="mb-20">
            <Image src={article.thumbnail} alt="blog-image" className="mb-3" />
            <h3 className="text-[24px] font-semibold">{article.title}</h3>
            <p className="font-medium opacity-50">
              {article.kategori.join(", ")}
            </p>
          </div>
          <div className="absolute bottom-4 right-4 flex gap-4">
            <BaseButton
              title="Edit Blog"
              radius="sm"
              color="success"
              className="font-medium"
            />
            <BaseButton
              title="Delete"
              radius="sm"
              color="danger"
              className="font-medium"
            />
          </div>
        </CardBody>
      </Card>
    );
  },
};

export default Cards;

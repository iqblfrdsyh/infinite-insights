import React from 'react'
import Link from 'next/link';
import { formatDate } from "@/libs/formatDate";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import {  BiTimeFive } from "react-icons/bi";
import { FaComment, FaAngleDoubleRight } from "react-icons/fa";

const CardArtikel = ({ article }) => {
    const truncateContent = (content, maxLength) => {
    const words = content.split(' ');
    if (words.length > maxLength) {
        return words.slice(0, maxLength).join(' ') + '...';
    } else {
        return content;
    }};

    return (
    <div>
        <Card className="w-[26rem] my-5">
        <Image
            className="object-cover w-full h-72 rounded-none"
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
            <h4 className="font-bold text-xl mt-2">{article.title}</h4>
            <p className="text-sm mb-2">{truncateContent(article.content, 10)}</p>
            <Link href="#" className="hover:underline">
            <p className="font-medium text-medium mb-2 justify-end flex text-blue-500 items-center">
              Read More <FaAngleDoubleRight className="ms-1" />
            </p>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardArtikel
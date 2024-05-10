import React from 'react'
// ArticleCard.js
import Image from 'next/image';
import { formatDate } from "@/libs/formatDate";

const ArticleCard = ({ article }) => {
  return (
    <div className=" w-full">
      <div className=" h-28 m-4 flex">
        <div className=" h-28 w-28 relative">
          <Image
            src={article.image}
            alt="Article Image"
            fill={true}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="w-2/3 ml-4">
          <h6 className="text-sm font-medium">{formatDate(article.time)}</h6>
          <h1 className="text-lg font-bold">{article.title}</h1>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

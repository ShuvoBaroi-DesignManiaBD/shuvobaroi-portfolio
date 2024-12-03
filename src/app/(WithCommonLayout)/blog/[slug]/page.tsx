/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
// import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import { getAArticle } from "@/app/actions/api";
import envConfig from "@/config";
import { formatDate } from "@/utils/shared";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: any }>;
}) {
  const slug = await params?.then((res) => res.slug); 
  if (!slug) {
    return <div>Blog not found!</div>;
  }
  console.log("slug", slug);
  

  let blogDetail = null;
  try {
    const response = await getAArticle({ slug:slug });
    blogDetail = response?.[0];
  } catch (error) {
    console.error("Error fetching blog details:", error);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pb-20 pt-32">
      <div className="mb-6">
        <Image
          width={500}
          height={500}
          src={envConfig.baseApi?.split("/api")[0] + blogDetail?.cover?.url}
          alt={blogDetail?.title || "blog_cover"}
          className="w-full h-auto rounded-md max-h-[55vh] object-cover"
        />
      </div>
      <h1 className="text-4xl font-bold mb-4">{blogDetail?.title || "blog title"}</h1>
      <p className="text-gray-500 mb-6">
        {formatDate(blogDetail?.createdAt) || Date.now()}
      </p>
      <div className="prose prose-lg">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {blogDetail?.description_in_markdown || "blog description"}
        </ReactMarkdown>
      </div>
    </div>
  );
};

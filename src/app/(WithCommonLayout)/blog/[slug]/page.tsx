// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// // import { useRouter } from "next/router";
// import ReactMarkdown from "react-markdown";
// import rehypeRaw from "rehype-raw";
// import Image from "next/image";
// import { getAArticle } from "@/app/actions/api";
// import envConfig from "@/config";
// import { formatDate } from "@/utils/shared";

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ slug: any }>;
// }) {
//   const slug = await params?.then((res) => res.slug); 
//   if (!slug) {
//     return <div>Blog not found!</div>;
//   }
//   console.log("slug", slug);
  

//   let blogDetail = null;
//   try {
//     const response = await getAArticle({ slug:slug });
//     blogDetail = response?.[0];
//   } catch (error) {
//     console.error("Error fetching blog details:", error);
//     return <div>Error loading the blog post.</div>;
//   }

//   if (!blogDetail) {
//     return <div>Blog not found!</div>;
//   }

  
//   return (
//     <div className="max-w-4xl mx-auto px-6 pb-20 pt-32">
//       <div className="mb-6">
//         <Image
//           width={500}
//           height={500}
//           src={envConfig.baseApi?.split("/api")[0] + blogDetail?.cover?.url}
//           alt={blogDetail?.title || "blog_cover"}
//           className="w-full h-auto rounded-md max-h-[55vh] object-cover"
//         />
//       </div>
//       <h1 className="text-4xl font-bold mb-4">{blogDetail?.title || "blog title"}</h1>
//       <p className="text-gray-500 mb-6">
//         {formatDate(blogDetail?.createdAt) || Date.now()}
//       </p>
//       <div className="prose prose-lg">
//         <ReactMarkdown rehypePlugins={[rehypeRaw]}>
//           {blogDetail?.description_in_markdown || "blog description"}
//         </ReactMarkdown>
//       </div>
//     </div>
//   );
// };





import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import { getAArticle } from "@/app/actions/api";
import envConfig from "@/config";
import { formatDate } from "@/utils/shared";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import OnThisPage from "@/components/OnThisPage";

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  if (!slug) {
    return <div>Blog not found!</div>;
  }

  let blogDetail = null;
  try {
    const response = await getAArticle({ slug });
    blogDetail = response?.[0];
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return <div>Error loading the blog post.</div>;
  }

  if (!blogDetail) {
    return <div>Blog not found!</div>;
  }

  const content = blogDetail.description_in_markdown || "No content available";

  // Process Markdown content using unified
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, { title: blogDetail?.title || "Blog Post" })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      transformers: [
        transformerCopyButton({
          visibility: "always",
          feedbackDuration: 3000,
        }),
      ],
    });

  const processedContent = (await processor.process(content)).toString();

  return (
    <div className="max-w-6xl mx-auto px-6 pb-20 pt-32">
      <div className="mb-6">
        <Image
          width={500}
          height={500}
          src={
            envConfig.baseApi?.replace("/api", "") + blogDetail.cover?.url || ""
          }
          alt={blogDetail.title || "blog_cover"}
          className="w-full h-auto rounded-md max-h-[55vh] object-cover"
        />
      </div>
      <h1 className="text-4xl font-bold mb-4">{blogDetail.title}</h1>
      <p className="opacity-90 mb-6 italic">{formatDate(blogDetail.createdAt)}</p>
      <div
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      ></div>
      <OnThisPage htmlContent={processedContent} />
    </div>
  );
}

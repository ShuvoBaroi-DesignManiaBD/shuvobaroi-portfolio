
import { getArticles } from "@/app/actions/api";
import MagicButton from "@/components/MagicButton";
import { ButtonSecondary } from "@/components/ui/buttons/ButtonSecondary";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import envConfig from "@/config";
import { formatDate } from "@/utils/shared";
import Image from "next/image";
import Link from "next/link";
import { Key, ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode } from "react";
import { v4 } from "uuid";

const blogPosts = [
  {
    id: 1,
    title: "Next.js for Beginners",
    description: "Learn the basics of building with Next.js.",
    date: "2024-12-01",
    image: "/nextjs-blog.jpg",
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS",
    description: "Utility-first CSS for faster development.",
    date: "2024-11-28",
    image: "/tailwind-css-blog.jpg",
  },
  {
    id: 3,
    title: "ShadCN UI: Components Done Right",
    description: "Elegant UI components for your projects.",
    date: "2024-11-20",
    image: "/shadcn-ui-blog.jpg",
  },
];

export default async function Page() {
  const blogs = await getArticles({ page: "1", pageSize: "3" });
  return (
    <div className="min-h-[80vh] pb-20 pt-32 flex flex-col">
      <div className="max-w-screen-xl mx-auto grid grid-cols-4 gap-6">
        <h1 className="col-span-full text-3xl pb-5">Blog</h1>
        {/* Blog Cards */}
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.map((post: { key: string | null; slug: string | null, cover: { url: string | number; }; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; createdAt: any; }, index: any) => (
            <Link key={post?.slug || v4()} href={`blog/${post?.slug}` || "#"}>
            
            <Card key={post?.slug} className="shadow-md hover:shadow-lg p-0">
              <CardHeader>
                <Image
                width={500}
                height={500}
                  src={envConfig.baseApi?.split("/api")[0] + post?.cover?.url}
                  alt={post.title}
                  className="rounded-t-lg w-full h-40 object-cover"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="leading-snug">{post.title}</CardTitle>
                {/* <p className="text-gray-600 text-sm mt-2">{post.description_in_markdown}</p> */}
                <p className="text-gray-400 text-xs mt-1">{formatDate(post.createdAt)}</p>
              </CardContent>
              <CardFooter className="px-4">
                <ButtonSecondary className="w-full">Read More</ButtonSecondary>
              </CardFooter>
            </Card>
            </Link>
          ))}
        </div>

        {/* Filters */}
        <div className="col-span-1 p-6 shadow-md rounded-lg border">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option>All</option>
              <option>Next.js</option>
              <option>Tailwind CSS</option>
              <option>ShadCN UI</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input type="date" className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <ButtonSecondary className="mt-6 w-full" filled={true}>Apply Filters</ButtonSecondary>
        </div>
      </div>
    </div>
  );
}

import { getBlogs } from "../services/blogs";
import BlogsClient from "./BlogsClient";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const blogs = await getBlogs();

  return <BlogsClient blogs={blogs} filter={filter ?? ""} />;
};
export default Blogs;

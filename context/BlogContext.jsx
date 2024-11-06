import React, { createContext, useContext, useState, useEffect } from "react";
import { END_POINTS, showToast } from "@/helper/endpoints";

// Create the BlogContext
const BlogContext = createContext();

// Provider Component
const BlogProvider = ({ children }) => {
  const [page, setPage] = useState("AllBlogs");
  const [viewBlog, setViewBlog] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogsByQrCode = async (item) => {
    try {
      const url = END_POINTS.GET_BLOG_BY_QR_KEY({ qrCode: item.qrCode });
      const res = await fetch(url);

      if (!res.ok) {
        const errorData = await res.json();
        showToast("Failed to fetch data: " + errorData.message);
        return null;
      }

      const data = await res.json();
      if (data.data.length > 0) {
        return { ...item, more: data.data[0] };
      } else {
        showToast("No Contribution found against this QR code.");
        return { ...item, more: null };
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
      showToast("An error occurred while fetching data.");
      return null;
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);

    try {
      const url = END_POINTS.GET_ALL_LIST_BLOG;
      const res = await fetch(url);

      if (!res.ok) {
        const errorData = await res.json();
        showToast(errorData.message || "No Blog found");
        setError(errorData.message || "No Blog found");
        return;
      }

      const data = await res.json();

      const blogsWithQrData = await Promise.all(
        data.map((blog) => fetchBlogsByQrCode(blog))
      );
      setBlogs(blogsWithQrData.filter(Boolean));

      if (blogsWithQrData.length === 0) {
        showToast("No Contribution found.");
      } else {
        showToast("Data fetched successfully.");
      }
    } catch (err) {
      showToast("An error occurred while fetching data.");
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const selectedBlog = blogs.find((b) => b._id === viewBlog);

  return (
    <BlogContext.Provider
      value={{
        blogs: blogs.filter((blog) => blog?.childStory?.length > 0),
        loading,
        error,
        fetchBlogs,
        viewBlog,
        setViewBlog,
        selectedBlog,
        page,
        setPage,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
export const useBlogContext = () => useContext(BlogContext);

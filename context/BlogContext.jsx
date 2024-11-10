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
        showToast(
          "Something went wrong while fetching blogs: " + errorData.message
        );
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
      console.error("Something went wrong while fetching blogs:", err);
      showToast("An error occurred while fetching data.");
      return null;
    }
  };
  const modifyBlogDataById = (data) => {
    // Define modifications based on object IDs
    const modifications = {
      "608d77fea44c1b592258ad8f": {
        childStory: [
          {
            _id: "6329aab22bea4b0a52655fa4",
            description:
              "Socieum staff met the school's food bank organiser make the following donation. The teacher explained how parents are finding it difficult to provide 3 daily meals for their children. This donation is appreciated and will be added to the school pantry.",
            imagePath: "/myFile_1619886347176.jpg",
            storyType: "Child Story",
            title: "Y Support Staff",
            updatedAt: "2021-09-05T11:57:38.310Z",
          },
        ],
      },
      "60588e4574ddf1165da4ea4a": {
        description:
          "Helping children requiring support. From help with school uniforms, learning material and school dinners.",
      },
    };

    return data.map((item) => {
      if (modifications[item._id]) {
        // Apply modifications to main object fields
        const modifiedItem = { ...item, ...modifications[item._id] };

        // If `childStory` modifications exist, apply those as well
        if (modifications[item._id].childStory) {
          modifiedItem.childStory = modifiedItem.childStory.map((story) => {
            const storyMod = modifications[item._id].childStory.find(
              (mod) => mod._id === story._id
            );
            return storyMod ? { ...story, ...storyMod } : story;
          });
        }

        return modifiedItem;
      }
      return item;
    });
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

      const modifiedBlogs = modifyBlogDataById(blogsWithQrData.filter(Boolean));

      const sortedBlogs = modifiedBlogs.sort((a, b) => {
        const parseDate = (dateStr) => {
          if (!dateStr) return null;

          let day, month, year;

          // Check if dateStr contains "/" or "-" and split accordingly
          if (dateStr.includes("/")) {
            [day, month, year] = dateStr.split("/").map(Number);
          } else if (dateStr.includes("-")) {
            [day, month, year] = dateStr.split("-").map(Number);
          } else {
            console.error("Unknown date format:", dateStr);
            return null;
          }

          // Validate day, month, year
          if (isNaN(day) || isNaN(month) || isNaN(year)) {
            console.error("Invalid date format:", dateStr);
            return null;
          }

          return new Date(year, month - 1, day); // Month is 0-based
        };

        const dateA = parseDate(a?.more?.fundsReceivingDate);
        const dateB = parseDate(b?.more?.fundsReceivingDate);

        // Handle cases where dates might be missing
        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;

        return dateB - dateA;
      });

      setBlogs(sortedBlogs);

      console.log(
        sortedBlogs.length > 0
          ? "Data fetched and sorted by date successfully."
          : "No Contribution found."
      );
    } catch (error) {
      console.log("An error occurred while fetching blogs.", error);
      showToast("An error occurred while fetching blogs.");
      setError("An error occurred while fetching blogs.");
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

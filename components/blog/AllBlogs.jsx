import BlogCard from "@/components/blog/cards/BlogCard";
import { useBlogContext } from "@/context/BlogContext";
import { ScrollView, View } from "react-native";
import Header from "@/components/Header";

export default function AllBlogs({ setPage }) {
  const { blogs } = useBlogContext();

  return (
    <View>
      <Header
        text={"Blog Y"}
        desc={
          "Read other blog published by Y"
        }
      />
      <ScrollView className="px-5 pb-12">
        {blogs &&
          blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              title={blog?.title || ""}
              description={blog?.description || ""}
              donorDescription={blog?.donorDescription || ""}
              imagePath={blog?.imagePath || ""}
              updatedAt={blog?.updatedAt || ""}
              donorName={blog?.donorName || ""}
              _id={blog?._id || ""}
            />
          ))}
      </ScrollView>
    </View>
  );
}

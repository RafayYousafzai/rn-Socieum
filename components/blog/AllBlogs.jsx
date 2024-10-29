import BlogCard from "@/components/BlogCard";
import { useBlogContext } from "@/context/BlogContext";
import { ScrollView } from "react-native";

export default function AllBlogs({ setPage }) {
    const { blogs } = useBlogContext();

    return (
        <ScrollView className="px-5 pb-12">
            {blogs && blogs.map((blog) => (
                <BlogCard
                    key={blog._id}
                    blog={blog}
                />
            ))}
        </ScrollView>
    )
}

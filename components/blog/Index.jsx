import { useCallback, useEffect, useState } from "react";
import Details from "./Details";
import OverView from "./OverView";
import Read from "./Read";
import AllBlogs from "./AllBlogs";
import { useBlogContext } from "@/context/BlogContext";
import { useFocusEffect } from "expo-router";

const ViewBlogs = ({ onlyHistory }) => {
  const [page, setPage] = useState("AllBlogs");
  const { selectedBlogs, viewBlog } = useBlogContext();

  useEffect(() => {
    if (!selectedBlogs) {
      setPage("AllBlogs");
    }
  }, [selectedBlogs]);

  useFocusEffect(
    useCallback(() => {
      console.log("AllBlogs listBlog");
      setPage("AllBlogs");
      return () => {};
    }, [])
  );

  switch (page) {
    case "AllBlogs":
      return <AllBlogs setPage={setPage} />;
    case "Details":
      return <Details setPage={setPage} blog={selectedBlogs} />;
    case "OverView":
      return <OverView setPage={setPage} blog={selectedBlogs} />;
    case "Read":
      return <Read setPage={setPage} blog={selectedBlogs} />;
    default:
      return <AllBlogs setPage={setPage} blog={selectedBlogs} />;
  }
};

export default ViewBlogs;

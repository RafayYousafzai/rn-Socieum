import { useCallback, useEffect, useState } from "react";
import Details from "./Details";
import OverView from "./OverView";
import Read from "./Read";
import AllBlogs from "./AllBlogs";
import { useBlogContext } from "@/context/BlogContext";
import { useFocusEffect } from "expo-router";

const ViewBlogs = ({ onlyHistory }) => {
  const { page, setPage, selectedBlog } = useBlogContext();

  useEffect(() => {
    if (!selectedBlog) {
      setPage("AllBlogs");
    }
  }, [selectedBlog]);

  switch (page) {
    case "AllBlogs":
      return <AllBlogs setPage={setPage} onlyHistory={onlyHistory} />;
    case "Details":
      return <Details setPage={setPage} blog={selectedBlog} />;
    case "OverView":
      return <OverView setPage={setPage} blog={selectedBlog} />;
    case "Read":
      return <Read setPage={setPage} blog={selectedBlog} />;
    default:
      return <AllBlogs setPage={setPage} blog={selectedBlog} />;
  }
};

export default ViewBlogs;

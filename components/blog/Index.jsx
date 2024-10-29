import React, { useEffect, useState } from 'react';
import Details from './Details';
import OverView from './OverView';
import Read from './Read';
import AllBlogs from './AllBlogs';
import { useBlogContext } from "@/context/BlogContext";


const ViewBlogs = ({ blog }) => {
    const [page, setPage] = useState("AllBlogs");
    const { viewBlog } = useBlogContext();


    useEffect(() => {
        if (viewBlog) {
            setPage("Details");
        }
    }, [viewBlog])




    switch (page) {
        case "AllBlogs":
            return <AllBlogs setPage={setPage} />;
        case "Details":
            return <Details setPage={setPage} blog={blog} />;
        // case "OverView":
        //     return <OverView setPage={setPage} blog={blog} />;
        // case "Read":
        //     return <Read setPage={setPage} blog={blog} />;
        default:
            return <AllBlogs setPage={setPage} blog={blog} />;
    }
};

export default ViewBlogs;
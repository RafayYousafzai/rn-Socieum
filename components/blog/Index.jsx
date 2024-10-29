import React, { useEffect, useState } from 'react';
import Details from './Details';
import OverView from './OverView';
import Read from './Read';


const ViewBlogs = ({ blog, }) => {
    const [page, setPage] = useState("Details");


    switch (page) {
        case "Details":
            return <Details setPage={setPage} blog={blog} />;
        case "OverView":
            return <OverView setPage={setPage} blog={blog} />;
        case "Read":
            return <Read setPage={setPage} blog={blog} />;
        default:
            return <Details setPage={setPage} blog={blog} />;
    }
};

export default ViewBlogs;

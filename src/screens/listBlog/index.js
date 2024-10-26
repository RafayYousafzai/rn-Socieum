import { searchBlogConnect } from "../../modules/redux/connect";
import ListBlog from "./listBlog";
export default searchBlogConnect()(ListBlog);

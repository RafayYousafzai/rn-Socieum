import Home from "./home";
import { searchBlogConnect } from "../../modules/redux/connect";
export default searchBlogConnect()(Home);

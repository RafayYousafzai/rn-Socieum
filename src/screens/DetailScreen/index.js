import { searchBlogConnect } from "../../modules/redux/connect";
import DetailScreen from "./details";
export default searchBlogConnect()(DetailScreen);

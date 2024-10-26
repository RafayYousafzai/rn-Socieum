import { searchBlogConnect } from "../../modules/redux/connect";
import ChildBlogScreen from "./childScreen";
export default searchBlogConnect()(ChildBlogScreen);

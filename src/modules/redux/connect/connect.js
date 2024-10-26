import { connect } from "react-redux";
import searchActionCreator from "../actions/actions";

function mapStateToProps({ searchData }) {
  return {
    searchData,
  };
}

const mapDispatchToProps = { ...searchActionCreator };

export function searchBlogConnect(configMapStateToProps = mapStateToProps) {
  return connect(configMapStateToProps, mapDispatchToProps);
}

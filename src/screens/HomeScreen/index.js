import { connect } from "react-redux";
import * as types from "../../constants/actionTypes";
import Home from "./home";

function mapStateToProps(state) {
  return {
    search: state.search,
    loading: state.loading[types.GET_SEARCH]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSearch: () => dispatch(action(types.GET_SEARCH, types.REQUEST))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

import { connect } from "react-redux";
import * as types from "../../constants/actionTypes";
import Details from "./details";

function mapStateToProps(state) {
  return {
    reviews: state.reviews,
    venue: state.venue,
    loading: state.loading[types.GET_VENUE] && state.loading[types.GET_REVIEWS]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getVenue: () => dispatch(action(types.GET_VENUE, types.REQUEST)),
    getReviews: () => dispatch(action(types.GET_REVIEWS, types.REQUEST))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);

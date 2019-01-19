import { put, takeEvery, all } from "redux-saga/effects";
import * as types from "../../constants/actionTypes";
import reviews from "../../Api/venue-reviews.json";
import venue from "../../Api/venue.json";

function* getReviews() {
  try {
    yield wait(1000);
    yield put(action(types.GET_REVIEWS, types.SUCCESS, reviews));
  } catch (error) {
    yield put(action(types.GET_REVIEWS, types.FAILURE, error));
  }
}

function* getVenueDetail() {
  try {
    yield wait(1000);
    yield put(action(types.GET_VENUE, types.SUCCESS, venue));
  } catch (error) {
    yield put(action(types.GET_VENUE, types.FAILURE, error));
  }
}

function* getAllReviews() {
  yield takeEvery(types.GET_REVIEWS + types.REQUEST, getReviews);
}

function* getVenue() {
  yield takeEvery(types.GET_VENUE + types.REQUEST, getVenueDetail);
}

export default function* init() {
  yield all([getAllReviews(), getVenue()]);
}

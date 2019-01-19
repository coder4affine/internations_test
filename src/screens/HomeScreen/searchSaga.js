import { put, takeEvery } from "redux-saga/effects";
import * as types from "../../constants/actionTypes";
import search from "../../Api/venue-search.json";

function* getSearchResult() {
  try {
    yield wait(1000);
    yield put(action(types.GET_SEARCH, types.SUCCESS, search));
  } catch (error) {
    yield put(action(types.GET_SEARCH, types.FAILURE, error));
  }
}

export default function* getSearch() {
  yield takeEvery(types.GET_SEARCH + types.REQUEST, getSearchResult);
}

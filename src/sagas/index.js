import { all } from "redux-saga/effects";
import search from "../screens/HomeScreen/searchSaga";
import detail from "../screens/ModalScreen/detailSaga";

export default function* rootSaga() {
  yield all([search(), detail()]);
}

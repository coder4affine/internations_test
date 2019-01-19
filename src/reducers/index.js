import { combineReducers } from "redux";
import { createNavigationReducer } from "react-navigation-redux-helpers";
import Navigator from "../navigation";
import loading from "./loadingReducer";
import error from "./errorReducer";
import search from "../screens/HomeScreen/searchReducer";
import reviews from "../screens/ModalScreen/reviewReducer";
import venue from "../screens/ModalScreen/venueReducer";

const navReducer = createNavigationReducer(Navigator);

const rootReducer = combineReducers({
  nav: navReducer,
  loading,
  error,
  search,
  reviews,
  venue
});

export default rootReducer;

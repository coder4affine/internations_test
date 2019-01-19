import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import appReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
let middleware = [sagaMiddleware];

if (__DEV__) {
  middleware = [...middleware, logger];
} else {
  middleware = [...middleware];
}

export default function configureStore(NavigationReduxMiddleware) {
  const store = createStore(
    appReducer,
    compose(applyMiddleware(...middleware, NavigationReduxMiddleware))
  );

  sagaMiddleware.run(rootSaga);
  return store;
}

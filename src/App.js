import React, { PureComponent } from "react";
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";
import { Provider, connect } from "react-redux";

import Navigator from "./navigation";
import configureStore from "./configureStore";

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);

const Root = reduxifyNavigator(Navigator, "root");
const mapStateToProps = state => ({
  state: state.nav
});
const AppWithNavigationState = connect(mapStateToProps)(Root);

const store = configureStore(middleware);

export default class App extends PureComponent {
  state = {};

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

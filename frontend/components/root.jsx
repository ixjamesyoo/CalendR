import React from 'react';
import { Provider } from 'react-redux';
import { Switch, HashRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import Modal from "./modal/modal_container";
import NavBar from "./navbar/navbar_container";
import HomePage from "./home_page/home_page";
import Calendar from "./calendar/calendar";

const Root = ({ store }) => (
  <Provider store={ store }>
    <HashRouter>
      <App/>
    </HashRouter>
  </Provider>
);

const App = () => (
  <React.Fragment>
    <Modal/>
    <NavBar/>
    <Switch>
      <AuthRoute exact path="/" component={ HomePage }/>
      <ProtectedRoute path="/my/calendar" component={ Calendar }/>
    </Switch>
  </React.Fragment>
);

export default Root;

import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Modal from "./modal/modal_container";
import NavBar from "./navbar/navbar_container";

const Root = ({ store }) => (
  <Provider store={ store }>
    <HashRouter>
      <App/>
    </HashRouter>
  </Provider>
);

const App = () => (
  <React.Fragment>
    Hello World!
    <Modal/>
    <NavBar/>
  </React.Fragment>
);

export default Root;

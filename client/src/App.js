import React from 'react';

// redux store
import store from "./store";
import { Provider } from "react-redux";
// react-router-dom
import { BrowserRouter, Switch, Route } from "react-router-dom";
// components
import Main from './components/Main/Main';
import AuthForm from './components/Form/AuthForm';
// butter toast
import ButterToast, {POS_TOP, POS_CENTER} from 'butter-toast';
// fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter >
        <ButterToast position={{vertical:POS_TOP, horizontal:POS_CENTER}} />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/auth" exact component={AuthForm} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

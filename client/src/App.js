import React, { useState, useEffect } from "react";

import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/products/Products";
import PrivateRoute from "./components/PrivateRoute";

import "./app.scss";

const App = () => {
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    //check for token

    if (localStorage.userAuth) {
      setAuth(true);
    }
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <Login {...props} isAuth={isAuth} setAuth={setAuth} />
          )}
        />
        <PrivateRoute
          path="/products"
          isAuth={isAuth}
          component={() => <Products setAuth={setAuth} />}
        />
      </Switch>
    </div>
  );
};

export default App;

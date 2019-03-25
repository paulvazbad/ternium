import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../utils/auth";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
          //Add first case if logged in but not allowed to see the content.
        if (auth.isAuthenticated()) { //Checks reduxStore
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

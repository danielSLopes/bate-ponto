import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function RestrictedRoute({ component: Component, render, ...otherProps }) {
  const routerProps = {};
  if ("manutencao" in otherProps) {
    routerProps["render"] = () => <Redirect to="/manutencao" />;
  } else routerProps["render"] = Component ? (props) => <Component {...props} /> : render;

  return <Route {...otherProps} {...routerProps} />;
}

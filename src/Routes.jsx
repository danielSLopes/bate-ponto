import React, { lazy, Suspense } from "react";
import { Redirect, Route } from "react-router-dom";
import Template from "./components/Template";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import SwitchRouter from "./components/SwitchRouter";

const Sigin = lazy(() => import("./screens/Sigin"));
const Home = lazy(() => import("./screens/Home"));
const NotFound = lazy(() => import("./screens/NotFound"));

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Routes() {
  const classes = useStyles();
  return (
    <Route
      render={(props) => {
        return (
          <Template {...props}>
            <Suspense
              fallback={
                <Backdrop className={classes.backdrop} open={true}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              }
            >
              <SwitchRouter>
                <Route exact path="/" component={Sigin} />
                <Route exact path="/home" component={Home} />
                <Route path="/404" component={NotFound} />
                <Redirect from="/*" to="/404" />
              </SwitchRouter>
            </Suspense>
          </Template>
        );
      }}
    />
  );
}

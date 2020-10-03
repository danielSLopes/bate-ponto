import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import Template from "./components/Template";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import Home from "./screens/Home";
import SwitchRouter from "./components/SwitchRouter";

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
                <Route exact path="/" component={Home} />
              </SwitchRouter>
            </Suspense>
          </Template>
        );
      }}
    />
  );
}

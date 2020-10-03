import React from "react";
import { Container, CssBaseline, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
      minHeight: "calc(100vh - 370px)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "center",
    },
  }));

export default function Template(props) {
    const classes = useStyles();
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <main className={classes.container}>{props.children}</main>
    </Container>
  );
}

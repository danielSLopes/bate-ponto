import React, { useContext, useEffect } from "react";
import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import app from "../services/firebase";
import history from "../services/history";
import { AuthContext } from "../services/Auth";
import { GlobalContext } from "../globalContext";
import Header from "./Header/Header";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "#57788a",
  },
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  appBarSpacer: theme.mixins.toolbar,
}));

export default function Template(props) {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [global, setGlobal] = useContext(GlobalContext);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if (!user) {
        history.push("/");
      }
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      app
        .firestore()
        .collection("users")
        .where("email", "==", currentUser.email)
        .where("ativo", "==", true)
        .limit(1)
        .get()
        .then(function (doc) {
          let aux = [];
          doc.forEach(function (doc) {
            let obj = doc.data();
            Object.assign(obj, { idFirestore: doc.id });
            aux.push(obj);
          });
          if (aux.length) {
            setGlobal({
              type: "setUser",
              payload: aux[0],
            });
          }
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    console.log(global);
  }, [global]);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <React.Fragment>
      {!global.isCheckingAuth && !currentUser ? (
        <div className={classes.container}>
          <Container component="main" maxWidth="lg">
            <CssBaseline />
            <main className={classes.container}>{props.children}</main>
          </Container>
        </div>
      ) : (
        <div className={classes.root}>
          <CssBaseline />
          <Header />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {props.children}
          </main>
        </div>
      )}
    </React.Fragment>
  );
}

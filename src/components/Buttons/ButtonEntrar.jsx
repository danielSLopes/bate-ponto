import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const styles = {
  button: {
    width: "100%",
    borderRadius: 0,
    color: "white",
    backgroundColor: "#1b4966",
    marginTop: 5,
    marginBottom: 5,
    "&:hover": {
      backgroundColor: "#26658c",
    },
    fontWeight: 600,
  },
};

export default withStyles(styles)(({ item, classes, color, ...other }) => (
  <Button className={classes.button} {...other} />
));

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
  },
}));

const Pemesanan = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Hello World</h1>
    </div>
  );
};

export default Pemesanan;

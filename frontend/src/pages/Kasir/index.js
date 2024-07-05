import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core"; // Tambahkan import Container dari Material-UI

const useStyles = makeStyles(theme => ({

    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.padding,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(2),
    }
  }));

const Kasir = () => {
    const classes = useStyles();
  return (
    <div>
    <Container maxWidth="lg" className={classes.container}>

      <h1>Hello World</h1>

    </Container >
    </div >
  );
};

export default Kasir;

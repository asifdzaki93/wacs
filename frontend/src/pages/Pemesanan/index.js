import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../services/api";
import { AuthContext } from "../../context/Auth/AuthContext";
import { toast } from "react-toastify";
import InvoiceForm from "../../components/Pemesanan/InvoiceForm"; // Sesuaikan path jika diperlukan
import { Container } from "@material-ui/core"; // Tambahkan import Container dari Material-UI

const useStyles = makeStyles(theme => ({

  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.padding,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
  }
}));

const Pemesanan = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data dari API
    const fetchData = async () => {
      try {
        const response = await api.get("/pemesanan"); // Sesuaikan endpoint API
        setData(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching data");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
    <Container maxWidth="lg" className={classes.container}>

      <InvoiceForm />

    </Container >
    </div >
  );
};

export default Pemesanan;

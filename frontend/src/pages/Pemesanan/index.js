import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../services/api";
import { AuthContext } from "../../context/Auth/AuthContext";
import { toast } from "react-toastify";
import InvoiceForm from "../../components/Pemesanan/InvoiceForm"; // Sesuaikan path jika diperlukan

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    maxWidth: "calc(100vw - 20px)", // Mengurangi 20px untuk memberikan sedikit ruang tepi
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
    <div className={classes.root}>
      <InvoiceForm />
    </div>
  );
};

export default Pemesanan;

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../services/api"; // Sesuaikan path ini
import { AuthContext } from "../../context/Auth/AuthContext"; // Sesuaikan path
import { toast } from "react-toastify";
import { i18n } from "../../translate/i18n"; // Jika menggunakan i18n

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: theme.palette.background.default,
  },
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
      <h1>Pemesanan</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Pemesanan;

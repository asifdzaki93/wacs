import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Pemesanan = () => {
  const classes = useStyles();

  return (
    <div>
      <h1>Dashboard Pemesanan</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell align="right">Nama Pemesan</TableCell>
              <TableCell align="right">Tanggal Pemesanan</TableCell>
              <TableCell align="right">Total Harga</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Data pemesanan akan ditampilkan di sini */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Pemesanan;

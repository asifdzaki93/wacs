import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Container, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from "@material-ui/core"; // Tambahkan import Container, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton dari Material-UI
import ViewIcon from "@material-ui/icons/Visibility"; // Tambahkan import ViewIcon
import EditIcon from "@material-ui/icons/Edit"; // Tambahkan import EditIcon
import DeleteIcon from "@material-ui/icons/Delete"; // Tambahkan import DeleteIcon

const useStyles = makeStyles(theme => ({
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(2),
    },
    table: {
      minWidth: 700,
    },
  }));

const Kasir = () => {
    const classes = useStyles();

    return (
      <div>
        <Container maxWidth="lg" className={classes.container}>
          <TextField
            id="search"
            label="Cari"
            type="search"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
            Buat
          </Button>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Penjualan ID</TableCell>
                <TableCell align="right">Tanggal</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Data penjualan akan ditampilkan di sini */}
              <TableRow>
                <TableCell component="th" scope="row">
                  1
                </TableCell>
                <TableCell align="right">2021-01-01</TableCell>
                <TableCell align="right">Rp 100.000</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="view">
                    <ViewIcon />
                  </IconButton>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Container>
      </div>
    );
};

export default Kasir;

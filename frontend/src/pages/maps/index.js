import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Container, TextField, Button, Paper, Typography, Box, IconButton } from "@material-ui/core";
import ViewIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  tableRow: {
    height: 30,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

const Maps = () => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/search', {
        params: { keyword }
      });
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(results);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'hasil_pencarian.xlsx');
  };

  const columns = [
    { name: 'Nama', selector: row => row.name, sortable: true },
    { name: 'No. Telepon', selector: row => row.phone_number, sortable: true },
    { name: 'Alamat', selector: row => row.formatted_address, sortable: true },
    {
      name: 'Aksi',
      cell: row => (
        <>
          <IconButton aria-label="view">
            <ViewIcon />
          </IconButton>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h4" component="h1" align="center" className={classes.title}>
          Pencarian Tempat
        </Typography>
        <Paper className={classes.paper} elevation={3}>
          <Typography variant="h6" component="h2" gutterBottom>
            Masukkan Kata Kunci
          </Typography>
          <form onSubmit={handleSearch}>
            <TextField
              fullWidth
              variant="outlined"
              label="Masukkan kata kunci..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              margin="normal"
            />
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Cari
              </Button>
            </Box>
          </form>
        </Paper>
        <Box mt={2} mb={2}>
          <Button variant="contained" color="secondary" onClick={handleExport}>
            Export ke Excel
          </Button>
        </Box>
        <Paper className={classes.paper} elevation={3}>
          <DataTable
            title="Hasil Pencarian"
            columns={columns}
            data={results}
            pagination
            highlightOnHover
            pointerOnHover
          />
        </Paper>
      </Container>
    </div>
  );
};

export default Maps;

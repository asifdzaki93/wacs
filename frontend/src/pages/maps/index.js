import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, TextField, Button, Paper, Typography, Box, IconButton } from '@material-ui/core';
import ViewIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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
  const apiKey = 'YOUR_API_KEY_HERE'; // Ganti dengan kunci API Anda

  const fetchPlaces = async (keyword, nextPageToken = '') => {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(keyword)}&key=${apiKey}${nextPageToken ? `&pagetoken=${nextPageToken}` : ''}`;
    const response = await axios.get(url);

    if (response.data.status !== 'OK') {
      throw new Error(response.data.status);
    }

    return response.data;
  };

  const getPlaceDetails = async (placeId) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_phone_number,formatted_address&key=${apiKey}`;
    const response = await axios.get(url);

    if (response.data.status !== 'OK') {
      throw new Error(response.data.status);
    }

    return response.data.result;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let allResults = [];
    let nextPageToken = '';

    try {
      do {
        const data = await fetchPlaces(keyword, nextPageToken);
        nextPageToken = data.next_page_token || '';

        for (const result of data.results) {
          const details = await getPlaceDetails(result.place_id);
          const phoneNumber = details.formatted_phone_number ? details.formatted_phone_number.replace(/\D/g, '') : 'Nomor telepon tidak tersedia';

          allResults.push({
            name: details.name,
            phone_number: phoneNumber.startsWith('0') ? '62' + phoneNumber.slice(1) : phoneNumber,
            formatted_address: details.formatted_address,
          });
        }

        if (nextPageToken) {
          await new Promise((resolve) => setTimeout(resolve, 2000)); // Tunggu sebelum permintaan berikutnya
        }
      } while (nextPageToken);

      setResults(allResults);
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

import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import idLocale from 'date-fns/locale/id';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Button, Stack, TextField } from '@mui/material';
import Typography from "@material-ui/core/Typography";
import api from '../../services/api';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { makeStyles } from "@material-ui/core/styles";
import './button.css';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.padding,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(2),
    }
}));

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            display: false,
        },
        title: {
            display: true,
            text: 'Grafik Percakapan',
            position: 'left',
        },
        datalabels: {
            display: true,
            anchor: 'start',
            offset: -30,
            align: "start",
            color: "#fff",
            textStrokeColor: "#000",
            textStrokeWidth: 2,
            font: {
                size: 20,
                weight: "bold"

            },
        }
    },
};

export const ChatsUser = () => {
    // const classes = useStyles();
    const [initialDate, setInitialDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState(new Date());
    const [ticketsData, setTicketsData] = useState({ data: [] });

    const companyId = localStorage.getItem("companyId");

    useEffect(() => {
        handleGetTicketsInformation();
    }, []);

    const dataCharts = {

        labels: ticketsData && ticketsData?.data.length > 0 && ticketsData?.data.map((item) => item.nama),
        datasets: [
            {
                data: ticketsData?.data.length > 0 && ticketsData?.data.map((item, index) => {
                    return item.jumlah
                }),
                backgroundColor: '#2DDD7F',
            },

        ],
    };

    const handleGetTicketsInformation = async () => {
        try {

            const { data } = await api.get(`/dashboard/ticketsUsers?initialDate=${format(initialDate, 'yyyy-MM-dd')}&finalDate=${format(finalDate, 'yyyy-MM-dd')}&companyId=${companyId}`);
            setTicketsData(data);
        } catch (error) {
            toast.error('Gagal mendapatkan informasi percakapan');
        }
    }

    return (
        <>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Total Percakapan oleh Pengguna
            </Typography>

            <Stack direction={'row'} spacing={2} alignItems={'center'} sx={{ my: 2, }} >

                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={idLocale}>
                    <DatePicker
                        value={initialDate}
                        onChange={(newValue) => { setInitialDate(newValue) }}
                        label="Mulai"
                        renderInput={(params) => <TextField fullWidth {...params} sx={{ width: '20ch' }} />}

                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={idLocale}>
                    <DatePicker
                        value={finalDate}
                        onChange={(newValue) => { setFinalDate(newValue) }}
                        label="Akhir"
                        renderInput={(params) => <TextField fullWidth {...params} sx={{ width: '20ch' }} />}
                    />
                </LocalizationProvider>

                <Button className="buttonHover" onClick={handleGetTicketsInformation} variant='contained'>Filter</Button>

            </Stack>
            <Bar options={options} data={dataCharts} style={{ maxWidth: '100%', maxHeight: '280px', }} />
        </>
    );
}
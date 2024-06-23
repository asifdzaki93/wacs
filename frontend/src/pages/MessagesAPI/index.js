import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { i18n } from "../../translate/i18n";
import { Button, CircularProgress, Grid, TextField, Typography } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import toastError from "../../errors/toastError";
import { toast } from "react-toastify";
import axios from "axios";
import usePlans from "../../hooks/usePlans";

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    flex: 1,
    padding: theme.spacing(2),
    paddingBottom: 100
  },
  mainHeader: {
    marginTop: theme.spacing(1),
  },
  elementMargin: {
    padding: theme.spacing(2),
  },
  formContainer: {
    maxWidth: 500,
  },
  textRight: {
    textAlign: "right"
  }
}));

const MessagesAPI = () => {
  const classes = useStyles();
  const history = useHistory();

  const [formMessageTextData,] = useState({ token: '', number: '', body: '' });
  const [formMessageMediaData,] = useState({ token: '', number: '', medias: '' });
  const [file, setFile] = useState({});

  const { getPlanCompany } = usePlans();

  useEffect(() => {
    async function fetchData() {
      const companyId = localStorage.getItem("companyId");
      const planConfigs = await getPlanCompany(undefined, companyId);
      if (!planConfigs.plan.useExternalApi) {
        toast.error("Perusahaan ini tidak memiliki izin untuk mengakses halaman ini! Kami akan mengarahkan Anda.");
        setTimeout(() => {
          history.push(`/`);
        }, 1000);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEndpoint = () => {
    return process.env.REACT_APP_BACKEND_URL + '/api/messages/send';
  }

  const handleSendTextMessage = async (values) => {
    const { number, body } = values;
    const data = { number, body };
    try {
      await axios.request({
        url: getEndpoint(),
        method: 'POST',
        data,
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${values.token}`
        }
      });
      toast.success('Pesan berhasil dikirim');
    } catch (err) {
      toastError(err);
    }
  }

  const handleSendMediaMessage = async (values) => {
    try {
      const firstFile = file[0];
      const data = new FormData();
      data.append('number', values.number);
      data.append('body', firstFile.name);
      data.append('medias', firstFile);
      await axios.request({
        url: getEndpoint(),
        method: 'POST',
        data,
        headers: {
          'Content-type': 'multipart/form-data',
          'Authorization': `Bearer ${values.token}`
        }
      });
      toast.success('Pesan berhasil dikirim');
    } catch (err) {
      toastError(err);
    }
  }

  const renderFormMessageText = () => {
    return (
      <Formik
        initialValues={formMessageTextData}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          setTimeout(async () => {
            await handleSendTextMessage(values);
            actions.setSubmitting(false);
            actions.resetForm();
          }, 400);
        }}
        className={classes.elementMargin}
      >
        {({ isSubmitting }) => (
          <Form className={classes.formContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  label={i18n.t("messagesAPI.textMessage.token")}
                  name="token"
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  className={classes.textField}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  label={i18n.t("messagesAPI.textMessage.number")}
                  name="number"
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  className={classes.textField}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  label={i18n.t("messagesAPI.textMessage.body")}
                  name="body"
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  className={classes.textField}
                  required
                />
              </Grid>
              <Grid item xs={12} className={classes.textRight}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.btnWrapper}
                >
                  {isSubmitting ? (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  ) : 'Kirim'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    )
  }

  const renderFormMessageMedia = () => {
    return (
      <Formik
        initialValues={formMessageMediaData}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          setTimeout(async () => {
            await handleSendMediaMessage(values);
            actions.setSubmitting(false);
            actions.resetForm();
            document.getElementById('medias').files = null;
            document.getElementById('medias').value = null;
          }, 400);
        }}
        className={classes.elementMargin}
      >
        {({ isSubmitting }) => (
          <Form className={classes.formContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  label={i18n.t("messagesAPI.mediaMessage.token")}
                  name="token"
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  className={classes.textField}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  label={i18n.t("messagesAPI.mediaMessage.number")}
                  name="number"
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  className={classes.textField}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <input type="file" name="medias" id="medias" required onChange={(e) => setFile(e.target.files)} />
              </Grid>
              <Grid item xs={12} className={classes.textRight}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.btnWrapper}
                >
                  {isSubmitting ? (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  ) : 'Kirim'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    )
  }

  return (
    <Paper
      className={classes.mainPaper}
      style={{ marginLeft: "5px" }}
      variant="outlined"
    >
      <Typography variant="h5">
        Dokumentasi untuk pengiriman pesan
      </Typography>
      <Typography variant="h6" color="primary" className={classes.elementMargin}>
        Metode Pengiriman
      </Typography>
      <Typography component="div">
        <ol>
          <li>Pesan Teks</li>
          <li>Pesan Media</li>
        </ol>
      </Typography>
      <Typography variant="h6" color="primary" className={classes.elementMargin}>
        Instruksi
      </Typography>
      <Typography className={classes.elementMargin} component="div">
        <b>Catatan penting</b><br />
        <ul>
          <li>Sebelum mengirim pesan, Anda harus mendaftarkan token yang terhubung ke koneksi yang akan mengirim pesan. <br />Untuk mendaftarkan, buka menu "Koneksi", klik tombol edit pada koneksi dan masukkan token di kolom yang tersedia.</li>
          <li>
            Nomor untuk pengiriman tidak boleh memiliki masker atau karakter khusus dan harus terdiri dari:
            <ul>
              <li>Kode negara</li>
              <li>Kode area</li>
              <li>Nomor</li>
            </ul>
          </li>
        </ul>
      </Typography>
      <Typography variant="h6" color="primary" className={classes.elementMargin}>
        1. Pesan Teks
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.elementMargin} component="div">
            <p>Berikut adalah daftar informasi yang diperlukan untuk mengirim pesan teks:</p>
            <b>Endpoint: </b> {getEndpoint()} <br />
            <b>Metode: </b> POST <br />
            <b>Headers: </b> Authorization (Bearer token) dan Content-Type (application/json) <br />
            <b>Body: </b> {"{ \"number\": \"6281234567890\", \"body\": \"Pesan Anda\" }"}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.elementMargin}>
            <b>Uji Pengiriman</b>
          </Typography>
          {renderFormMessageText()}
        </Grid>
      </Grid>
      <Typography variant="h6" color="primary" className={classes.elementMargin}>
        2. Pesan Media
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.elementMargin} component="div">
            <p>Berikut adalah daftar informasi yang diperlukan untuk mengirim pesan media:</p>
            <b>Endpoint: </b> {getEndpoint()} <br />
            <b>Metode: </b> POST <br />
            <b>Headers: </b> Authorization (Bearer token) dan Content-Type (multipart/form-data) <br />
            <b>FormData: </b> <br />
            <ul>
              <li>
                <b>number: </b> 6281234567890
              </li>
              <li>
                <b>medias: </b> file
              </li>
            </ul>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.elementMargin}>
            <b>Uji Pengiriman</b>
          </Typography>
          {renderFormMessageMedia()}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MessagesAPI;

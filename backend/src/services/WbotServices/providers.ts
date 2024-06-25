import { proto, WASocket } from "@whiskeysockets/baileys";
import Contact from "../../models/Contact";
import Setting from "../../models/Setting";
import Ticket from "../../models/Ticket";
import { getBodyMessage, isNumeric, sleep, validaCpfCnpj, sendMessageImage, sendMessageLink, makeid } from "./wbotMessageListener";
import formatBody from "../../helpers/Mustache";

import puppeteer from "puppeteer";

import axios from 'axios';
import UpdateTicketService from "../TicketServices/UpdateTicketService";
import fs from 'fs';

export const provider = async (ticket: Ticket, msg: proto.IWebMessageInfo, companyId: number, contact: Contact, wbot: WASocket) => {
  const filaescolhida = ticket.queue?.name
  if (filaescolhida === "2ª Via de Boleto" || filaescolhida === "2 Via de Boleto") {
    let cpfcnpj
    cpfcnpj = getBodyMessage(msg);
    cpfcnpj = cpfcnpj.replace(/\./g, '');
    cpfcnpj = cpfcnpj.replace('-', '')
    cpfcnpj = cpfcnpj.replace('/', '')
    cpfcnpj = cpfcnpj.replace(' ', '')
    cpfcnpj = cpfcnpj.replace(',', '')

    const asaastoken = await Setting.findOne({
      where: {
        key: "asaas",
        companyId
      }
    });
    const ixcapikey = await Setting.findOne({
      where: {
        key: "tokenixc",
        companyId
      }
    });
    const urlixcdb = await Setting.findOne({
      where: {
        key: "ipixc",
        companyId
      }
    });
    const ipmkauth = await Setting.findOne({
      where: {
        key: "ipmkauth",
        companyId
      }
    });
    const clientidmkauth = await Setting.findOne({
      where: {
        key: "clientidmkauth",
        companyId
      }
    });
    const clientesecretmkauth = await Setting.findOne({
      where: {
        key: "clientsecretmkauth",
        companyId
      }
    });

    let urlmkauth = ipmkauth.value
    if (urlmkauth.substr(-1) === '/') {
      urlmkauth = urlmkauth.slice(0, -1);
    }

    //VARS
    let url = `${urlmkauth}/api/`;
    const Client_Id = clientidmkauth.value
    const Client_Secret = clientesecretmkauth.value
    const ixckeybase64 = btoa(ixcapikey.value);
    const urlixc = urlixcdb.value
    const asaastk = asaastoken.value

    const cnpj_cpf = getBodyMessage(msg);
    let numberCPFCNPJ = cpfcnpj;

    if (urlmkauth != "" && Client_Id != "" && Client_Secret != "") {
      if (isNumeric(numberCPFCNPJ) === true) {
        if (cpfcnpj.length > 2) {
          const isCPFCNPJ = validaCpfCnpj(numberCPFCNPJ)
          if (isCPFCNPJ) {
            const textMessage = {
              text: formatBody(`Tunggu sebentar! Kami sedang memeriksa data di basis data!`, contact),
            };
            try {
              await sleep(2000)
              await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, textMessage);
            } catch (error) {

            }


            axios({
              rejectUnauthorized: true,
              method: 'get',
              url,
              auth: {
                username: Client_Id,
                password: Client_Secret
              }
            } as any)
              .then(function (response) {
                const jtw = response.data
                var config = {
                  method: 'GET',
                  url: `${urlmkauth}/api/cliente/show/${numberCPFCNPJ}`,
                  headers: {
                    Authorization: `Bearer ${jtw}`
                  }
                };
                axios.request(config as any)
                  .then(async function (response) {
                    if (response.data == 'NULL') {
                      const textMessage = {
                        text: formatBody(`Data tidak ditemukan! *CPF/CNPJ* tidak valid atau salah. Coba lagi!`, contact),
                      };
                      try {
                        await sleep(2000)
                        await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, textMessage);
                      } catch (error) {
                        console.log('Tidak bisa mengirim pesan!')
                      }
                    } else {
                      let nome
                      let cpf_cnpj
                      let qrcode
                      let valor
                      let bloqueado
                      let linhadig
                      let uuid_cliente
                      let referencia
                      let status
                      let datavenc
                      let descricao
                      let titulo
                      let statusCorrigido
                      let valorCorrigido

                      nome = response.data.dados_cliente.titulos.nome
                      cpf_cnpj = response.data.dados_cliente.titulos.cpf_cnpj
                      valor = response.data.dados_cliente.titulos.valor
                      bloqueado = response.data.dados_cliente.titulos.bloqueado
                      uuid_cliente = response.data.dados_cliente.titulos.uuid_cliente
                      qrcode = response.data.dados_cliente.titulos.qrcode
                      linhadig = response.data.dados_cliente.titulos.linhadig
                      referencia = response.data.dados_cliente.titulos.referencia
                      status = response.data.dados_cliente.titulos.status
                      datavenc = response.data.dados_cliente.titulos.datavenc
                      descricao = response.data.dados_cliente.titulos.descricao
                      titulo = response.data.dados_cliente.titulos.titulo
                      statusCorrigido = status[0].toUpperCase() + status.substr(1);
                      valorCorrigido = valor.replace(".", ",");

                      var curdate = new Date(datavenc)
                      const mesCorreto = curdate.getMonth() + 1
                      const ano = ('0' + curdate.getFullYear()).slice(-4)
                      const mes = ('0' + mesCorreto).slice(-2)
                      const dia = ('0' + curdate.getDate()).slice(-2)
                      const anoMesDia = `${dia}/${mes}/${ano}`

                      try {
                        const textMessage = { text: formatBody(`Kami menemukan data Anda! *${nome}* mohon tunggu sebentar lagi!`, contact) };
                        await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, textMessage);
                        const bodyBoleto = { text: formatBody(`Berikut adalah salinan kedua tagihan Anda!\n\n*Nama:* ${nome}\n*Nilai:* R$ ${valorCorrigido}\n*Tanggal Jatuh Tempo:* ${anoMesDia}\n*Link:* ${urlmkauth}/boleto/21boleto.php?titulo=${titulo}\n\nSaya akan mengirimkan *kode batang* pada pesan berikutnya untuk memudahkan Anda menyalinnya!`, contact) };
                        await sleep(2000)
                        await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyBoleto);
                        const bodyLinha = { text: formatBody(`${linhadig}`, contact) };
                        await sleep(2000)
                        await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyLinha);
                        if (qrcode !== null) {
                          const bodyPdf = { text: formatBody(`Ini adalah *PIX Copia e Cola*`, contact) };
                          await sleep(2000)
                          await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyPdf);
                          const bodyqrcode = { text: formatBody(`${qrcode}`, contact) };
                          await sleep(2000)
                          await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyqrcode);
                          let linkBoleto = `https://chart.googleapis.com/chart?cht=qr&chs=500x500&chld=L|0&chl=${qrcode}`
                          await sleep(2000)
                          await sendMessageImage(wbot, contact, ticket, linkBoleto, "")
                        }
                        const bodyPdf = { text: formatBody(`Sekarang saya akan mengirimkan tagihan dalam bentuk *PDF* jika Anda membutuhkannya.`, contact) };
                        await sleep(2000)
                        const bodyPdfQr = { text: formatBody(`${bodyPdf}`, contact) };
                        await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyPdfQr);
                        await sleep(2000)

                        //GERA O PDF
                        const nomePDF = `Boleto-${nome}-${dia}-${mes}-${ano}.pdf`;
                        (async () => {
                          const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
                          const page = await browser.newPage();
                          const website_url = `${urlmkauth}/boleto/21boleto.php?titulo=${titulo}`;
                          await page.goto(website_url, { waitUntil: 'networkidle0' });
                          await page.emulateMediaType('screen');
                          // Downlaod the PDF
                          const pdf = await page.pdf({
                            path: nomePDF,
                            printBackground: true,
                            format: 'A4',
                          });

                          await browser.close();
                          await sendMessageLink(wbot, contact, ticket, nomePDF, nomePDF);
                        });


                        if (bloqueado === 'sim') {
                          const bodyBloqueio = { text: formatBody(`${nome} kami juga melihat bahwa koneksi Anda diblokir! Kami akan membukanya untuk Anda selama *48 jam*.`, contact) };
                          await sleep(2000)
                          await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyBloqueio);
                          const bodyqrcode = { text: formatBody(`Kami sedang membuka akses Anda. Mohon tunggu!`, contact) };
                          await sleep(2000)
                          await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyqrcode);
                          var optionsdesbloq = {
                            method: 'GET',
                            url: `${urlmkauth}/api/cliente/desbloqueio/${uuid_cliente}`,
                            headers: {
                              Authorization: `Bearer ${jtw}`
                            }
                          };
                          axios.request(optionsdesbloq as any).then(async function (response) {
                            const bodyLiberado = { text: formatBody(`Selesai, kami sudah membukanya! Kami butuh Anda untuk *cabut* perangkat dari stopkontak.\n\n*CATATAN: Hanya cabut dari stopkontak.* \nTunggu 1 menit dan colokkan kembali!`, contact) };
                            await sleep(2000)
                            await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyLiberado);
                            const bodyqrcode = { text: formatBody(`Lihat apakah akses Anda sudah kembali! Jika belum, silakan hubungi kami dan berbicara dengan petugas!`, contact) };
                            await sleep(2000)
                            await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyqrcode);
                          }).catch(async function (error) {
                            const bodyfinaliza = { text: formatBody(`Oops! Terjadi kesalahan, ketik *#* dan berbicara dengan petugas!`, contact) };
                            await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyfinaliza);
                          });
                        }


                        const bodyfinaliza = { text: formatBody(`Kami mengakhiri percakapan ini! Jika perlu, silakan hubungi kami kembali!`, contact) };
                        await sleep(12000)
                        await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyfinaliza);

                        await sleep(2000)
                        fs.unlink(nomePDF, function (err) {
                          if (err) throw err;
                          console.log(err);
                        })

                        await UpdateTicketService({
                          ticketData: { status: "closed" },
                          ticketId: ticket.id,
                          companyId: ticket.companyId,
                        });

                      } catch (error) {
                        console.log('Tidak bisa mengirim pesan!')
                      }
                    }
                  })
                  .catch(async function (error) {
                    try {
                      const bodyBoleto = { text: formatBody(`Tidak bisa menemukan data Anda.\n\nSilakan coba lagi!\nAtau ketik *#* untuk kembali ke *Menu Sebelumnya*`, contact) };
                      await sleep(2000)
                      await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyBoleto);
                    } catch (error) {
                      console.log('Tidak bisa mengirim pesan!')
                    }

                  });
              })
              .catch(async function (error) {
                const bodyfinaliza = { text: formatBody(`Oops! Terjadi kesalahan, ketik *#* dan berbicara dengan petugas!`, contact) };
                await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyfinaliza);
              });
          } else {
            const body = { text: formatBody(`CPF/CNPJ tidak valid!\n\nSilakan coba lagi!\nAtau ketik *#* untuk kembali ke menu sebelumnya`, contact) };
            await sleep(2000)
            await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body);
          }
        }
      }
    }

    if (asaastoken.value !== "") {
      if (isNumeric(numberCPFCNPJ) === true) {
        if (cpfcnpj.length > 2) {
          const isCPFCNPJ = validaCpfCnpj(numberCPFCNPJ)
          if (isCPFCNPJ) {
            const body = {
              text: formatBody(`Tunggu sebentar! Kami sedang memeriksa data di basis data!`, contact),
            };
            try {
              await sleep(2000)
              await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body);
            } catch (error) {
            }
            var optionsc = {
              method: 'GET',
              url: 'https://www.asaas.com/api/v3/customers',
              params: { cpfCnpj: numberCPFCNPJ },
              headers: {
                'Content-Type': 'application/json',
                access_token: asaastk
              }
            };

            axios.request(optionsc as any).then(async function (response) {
              let nome;
              let id_cliente;
              let totalCount;

              nome = response?.data?.data[0]?.name;
              id_cliente = response?.data?.data[0]?.id;
              totalCount = response?.data?.totalCount;

              if (totalCount === 0) {
                const body = {
                  text: formatBody(`Data tidak ditemukan! *CPF/CNPJ* tidak valid atau salah. Coba lagi!`, contact),
                };
                await sleep(2000)
                await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body);
              } else {

                const body = {
                  text: formatBody(`Kami menemukan data Anda! \n*${nome}* mohon tunggu sebentar lagi!`, contact),
                };
                await sleep(2000)
                await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body);
                var optionsListpaymentOVERDUE = {
                  method: 'GET',
                  url: 'https://www.asaas.com/api/v3/payments',
                  params: { customer: id_cliente, status: 'OVERDUE' },
                  headers: {
                    'Content-Type': 'application/json',
                    access_token: asaastk
                  }
                };

                axios.request(optionsListpaymentOVERDUE as any).then(async function (response) {
                  let totalCount_overdue;
                  totalCount_overdue = response?.data?.totalCount;

                  if (totalCount_overdue === 0) {
                    const body = {
                      text: formatBody(`Anda tidak memiliki tagihan jatuh tempo! Saya akan mengirimkan tagihan berikutnya. Mohon tunggu!`, contact),
                    };
                    await sleep(2000)
                    await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body);
                    var optionsPENDING = {
                      method: 'GET',
                      url: 'https://www.asaas.com/api/v3/payments',
                      params: { customer: id_cliente, status: 'PENDING' },
                      headers: {
                        'Content-Type': 'application/json',
                        access_token: asaastk
                      }
                    };

                    axios.request(optionsPENDING as any).then(async function (response) {
                      function sortfunction(a, b) {
                        return a.dueDate.localeCompare(b.dueDate);
                      }
                      const ordenado = response?.data?.data.sort(sortfunction);
                      let id_payment_pending;
                      let value_pending;
                      let description_pending;
                      let invoiceUrl_pending;
                      let dueDate_pending;
                      let invoiceNumber_pending;
                      let totalCount_pending;
                      let value_pending_corrigida;
                      let dueDate_pending_corrigida;

                      id_payment_pending = ordenado[0]?.id;
                      value_pending = ordenado[0]?.value;
                      description_pending = ordenado[0]?.description;
                      invoiceUrl_pending = ordenado[0]?.invoiceUrl;
                      dueDate_pending = ordenado[0]?.dueDate;
                      invoiceNumber_pending = ordenado[0]?.invoiceNumber;
                      totalCount_pending = response?.data?.totalCount;

                      dueDate_pending_corrigida = dueDate_pending?.split('-')?.reverse()?.join('/');
                      value_pending_corrigida = value_pending.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

                      const bodyBoleto = {
                        text: formatBody(`Berikut adalah salinan kedua tagihan Anda!\n\n*Tagihan:* ${invoiceNumber_pending}\n*Nama:* ${nome}\n*Nilai:* R$ ${value_pending_corrigida}\n*Tanggal Jatuh Tempo:* ${dueDate_pending_corrigida}\n*Deskripsi:*\n${description_pending}\n*Link:* ${invoiceUrl_pending}`, contact),
                      };
                      await sleep(2000)
                      await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyBoleto);
                      //GET DADOS PIX
                      var optionsGetPIX = {
                        method: 'GET',
                        url: `https://www.asaas.com/api/v3/payments/${id_payment_pending}/pixQrCode`,
                        headers: {
                          'Content-Type': 'application/json',
                          access_token: asaastk
                        }
                      };

                      axios.request(optionsGetPIX as any).then(async function (response) {
                        let success;
                        let payload;

                        success = response?.data?.success;
                        payload = response?.data?.payload;

                        if (success === true) {
                          const bodyPixCP = {
                            text: formatBody(`Ini adalah *PIX Copia e Cola*`, contact),
                          };
                          await sleep(2000)
                          await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyPixCP);
                          const bodyPix = {
                            text: formatBody(`${payload}`, contact),
                          };
                          await sleep(2000)
                          await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyPix);
                          let linkBoleto = `https://chart.googleapis.com/chart?cht=qr&chs=500x500&chld=L|0&chl=${payload}`
                          await sleep(2000)
                          await sendMessageImage(wbot, contact, ticket, linkBoleto, '')
                          var optionsBoletopend = {
                            method: 'GET',
                            url: `https://www.asaas.com/api/v3/payments/${id_payment_pending}/identificationField`,
                            headers: {
                              'Content-Type': 'application/json',
                              access_token: asaastk
                            }
                          };

                          axios.request(optionsBoletopend as any).then(async function (response) {
                            let codigo_barras
                            codigo_barras = response.data.identificationField;
                            const bodycodigoBarras = {
                              text: formatBody(`${codigo_barras}`, contact),
                            };
                            if (response.data?.errors?.code !== 'invalid_action') {
                              const bodycodigo = {
                                text: formatBody(`Ini adalah *Kode Batang*!`, contact),
                              };
                              await sleep(2000)
                              await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodycodigo);
                              await sleep(2000)
                              await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodycodigoBarras);
                              const bodyfinaliza = {
                                text: formatBody(`Kami mengakhiri percakapan ini! Jika perlu, silakan hubungi kami kembali!`, contact),
                              };
                              await sleep(2000)
                              await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyfinaliza);
                              await sleep(2000)
                              await UpdateTicketService({
                                ticketData: { status: "closed" },
                                ticketId: ticket.id,
                                companyId: ticket.companyId,
                              });
                            } else {
                              const bodyfinaliza = {
                                text: formatBody(`Kami mengakhiri percakapan ini! Jika perlu, silakan hubungi kami kembali!`, contact),
                              };
                              await sleep(2000)
                              await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyfinaliza);
                              await UpdateTicketService({
                                ticketData: { status: "closed" },
                                ticketId: ticket.id,
                                companyId: ticket.companyId,
                              });
                            }

                          }).catch(async function (error) {
                            const bodyfinaliza = {
                              text: formatBody(`Kami mengakhiri percakapan ini! Jika perlu, silakan hubungi kami kembali!`, contact),
                            };
                            await sleep(2000)
                            await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyfinaliza);
                            await UpdateTicketService({
                              ticketData: { status: "closed" },
                              ticketId: ticket.id,
                              companyId: ticket.companyId,
                            });
                          });
                        }

                      }).catch(async function (error) {
                        const body = {
                          text: formatBody(`*Oops!* Terjadi kesalahan! Ketik *#* dan berbicara dengan petugas!`, contact),
                        };
                        await sleep(2000)
                        await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body);
                      });

                    }).catch(async function (error) {
                      const body = {
                        text: formatBody(`*Oops!* Terjadi kesalahan! Ketik *#* dan berbicara dengan petugas!`, contact),
                      };
                      await sleep(2000)
                      await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body);
                    });
                  } else {
                    let id_payment_overdue;
                    let value_overdue;
                    let description_overdue;
                    let invoiceUrl_overdue;
                    let dueDate_overdue;
                    let invoiceNumber_overdue;

                    let value_overdue_corrigida;
                    let dueDate_overdue_corrigida;

                    id_payment_overdue = response?.data?.data[0]?.id;
                    value_overdue = response?.data?.data[0]?.value;
                    description_overdue = response?.data?.data[0]?.description;
                    invoiceUrl_overdue = response?.data?.data[0]?.invoiceUrl;
                    dueDate_overdue = response?.data?.data[0]?.dueDate;
                    invoiceNumber_overdue = response?.data?.data[0]?.invoiceNumber;


                    dueDate_overdue_corrigida = dueDate_overdue?.split('-')?.reverse()?.join('/');
                    value_overdue_corrigida = value_overdue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
                    const body = {
                      text: formatBody(`Anda memiliki *${totalCount_overdue}* tagihan jatuh tempo! Saya akan mengirimkannya. Mohon tunggu!`, contact),
                    };
                    await sleep(2000)
                    await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body);
                    const bodyBoleto = {
                      text: formatBody(`Berikut adalah salinan kedua tagihan Anda!\n\n*Tagihan:* ${invoiceNumber_overdue}\n*Nama:* ${nome}\n*Nilai:* R$ ${value_overdue_corrigida}\n*Tanggal Jatuh Tempo:* ${dueDate_overdue_corrigida}\n*Deskripsi:*\n${description_overdue}\n*Link:* ${invoiceUrl_overdue}`, contact),
                    };
                    await sleep(2000)
                    await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyBoleto);
                    //GET DADOS PIX
                    var optionsGetPIX = {
                      method: 'GET',
                      url: `https://www.asaas.com/api/v3/payments/${id_payment_overdue}/pixQrCode`,
                      headers: {
                        'Content-Type': 'application/json',
                        access_token: asaastk
                      }
                    };

                    axios.request(optionsGetPIX as any).then(async function (response) {
                      let success;
                      let payload;

                      success = response?.data?.success;
                      payload = response?.data?.payload;
                      if (success === true) {

                        const bodyPixCP = {
                          text: formatBody(`Ini adalah *PIX Copia e Cola*`, contact),
                        };
                        await sleep(2000)
                        await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyPixCP);
                        const bodyPix = {
                          text: formatBody(`${payload}`, contact),
                        };
                        await sleep(2000)
                        await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyPix);
                        let linkBoleto = `https://chart.googleapis.com/chart?cht=qr&chs=500x500&chld=L|0&chl=${payload}`
                        await sleep(2000)
                        await sendMessageImage(wbot, contact, ticket, linkBoleto, '')
                        var optionsBoleto = {
                          method: 'GET',
                          url: `https://www.asaas.com/api/v3/payments/${id_payment_overdue}/identificationField`,
                          headers: {
                            'Content-Type': 'application/json',
                            access_token: asaastk
                          }
                        };

                        axios.request(optionsBoleto as any).then(async function (response) {

                          let codigo_barras
                          codigo_barras = response.data.identificationField;
                          const bodycodigoBarras = {
                            text: formatBody(`${codigo_barras}`, contact),
                          };
                          if (response.data?.errors?.code !== 'invalid_action') {
                            const bodycodigo = {
                              text: formatBody(`Ini adalah *Kode Batang*!`, contact),
                            };
                            await sleep(2000)
                            await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodycodigo);
                            await sleep(2000)
                            await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodycodigoBarras);
                            const bodyfinaliza = {
                              text: formatBody(`Kami mengakhiri percakapan ini! Jika perlu, silakan hubungi kami kembali!`, contact),
                            };
                            await sleep(2000)
                            await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyfinaliza);
                            await UpdateTicketService({
                              ticketData: { status: "closed" },
                              ticketId: ticket.id,
                              companyId: ticket.companyId,
                            });
                          } else {
                            const bodyfinaliza = {
                              text: formatBody(`Kami mengakhiri percakapan ini! Jika perlu, silakan hubungi kami kembali!`, contact),
                            };
                            await sleep(2000)
                            await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyfinaliza);
                            await UpdateTicketService({
                              ticketData: { status: "closed" },
                              ticketId: ticket.id,
                              companyId: ticket.companyId,
                            });
                          }

                        }).catch(function (error) {
                          //console.error(error);
                        });

                      }
                    }).catch(function (error) {

                    });

                  }

                }).catch(async function (error) {
                  const body = {
                    text: formatBody(`*Oops!* Terjadi kesalahan! Ketik *#* dan berbicara dengan petugas!`, contact),
                  };
                  await sleep(2000)
                  await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body);
                });
              }
            }).catch(async function (error) {
              const body = {
                text: formatBody(`*Oops!* Terjadi kesalahan! Ketik *#* dan berbicara dengan petugas!`, contact),
              };
              await sleep(2000)
              await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body);
            });
          }
        }
      }
    }

    if (ixcapikey.value != "" && urlixcdb.value != "") {
      if (isNumeric(numberCPFCNPJ) === true) {
        if (cpfcnpj.length > 2) {
          const isCPFCNPJ = validaCpfCnpj(numberCPFCNPJ)
          if (isCPFCNPJ) {
            if (numberCPFCNPJ.length <= 11) {
              numberCPFCNPJ = numberCPFCNPJ.replace(/(\d{3})(\d)/, "$1.$2")
              numberCPFCNPJ = numberCPFCNPJ.replace(/(\d{3})(\d)/, "$1.$2")
              numberCPFCNPJ = numberCPFCNPJ.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            } else {
              numberCPFCNPJ = numberCPFCNPJ.replace(/^(\d{2})(\d)/, "$1.$2")
              numberCPFCNPJ = numberCPFCNPJ.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
              numberCPFCNPJ = numberCPFCNPJ.replace(/\.(\d{3})(\d)/, ".$1/$2")
              numberCPFCNPJ = numberCPFCNPJ.replace(/(\d{4})(\d)/, "$1-$2")
            }
            //const token = await CheckSettingsHelper("OBTEM O TOKEN DO BANCO (dei insert na tabela settings)")
            const body = {
              text: formatBody(`Tunggu sebentar! Kami sedang memeriksa data di basis data!`, contact),
            };
            try {
              await sleep(2000)
              await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body);
            } catch (error) {
            }
            var options = {
              method: 'GET',
              url: `${urlixc}/webservice/v1/cliente`,
              headers: {
                ixcsoft: 'listar',
                Authorization: `Basic ${ixckeybase64}`
              },
              data: {
                qtype: 'cliente.cnpj_cpf',
                query: numberCPFCNPJ,
                oper: '=',
                page: '1',
                rp: '1',
                sortname: 'cliente.cnpj_cpf',
                sortorder: 'asc'
              }
            };

            axios.request(options as any).then(async function (response) {
              if (response.data.type === 'error') {
                console.log("Error response", response.data.message);
                const body = {
                  text: formatBody(`*Oops!* Terjadi kesalahan! Ketik *#* dan berbicara dengan petugas!`, contact),
                };
                await sleep(2000)
                await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body);
              } if (response.data.total === 0) {
                const body = {
                  text: formatBody(`Data tidak ditemukan! *CPF/CNPJ* tidak valid atau salah. Coba lagi!`, contact),
                };
                try {
                  await sleep(2000)
                  await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body);
                } catch (error) {
                }
              } else {

                let nome;
                let id;
                let type;

                nome = response.data?.registros[0]?.razao
                id = response.data?.registros[0]?.id
                type = response.data?.type


                const body = {
                  text: formatBody(`Kami menemukan data Anda! \n*${nome}* mohon tunggu sebentar lagi!`, contact),
                };
                await sleep(2000)
                await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body);
                var boleto = {
                  method: 'GET',
                  url: `${urlixc}/webservice/v1/fn_areceber`,
                  headers: {
                    ixcsoft: 'listar',
                    Authorization: `Basic ${ixckeybase64}`
                  },
                  data: {
                    qtype: 'fn_areceber.id_cliente',
                    query: id,
                    oper: '=',
                    page: '1',
                    rp: '1',
                    sortname: 'fn_areceber.data_vencimento',
                    sortorder: 'asc',
                    grid_param: '[{"TB":"fn_areceber.status", "OP" : "=", "P" : "A"}]'
                  }
                };
                axios.request(boleto as any).then(async function (response) {



                  let gateway_link;
                  let valor;
                  let datavenc;
                  let datavencCorrigida;
                  let valorCorrigido;
                  let linha_digitavel;
                  let impresso;
                  let idboleto;

                  idboleto = response.data?.registros[0]?.id
                  gateway_link = response.data?.registros[0]?.gateway_link
                  valor = response.data?.registros[0]?.valor
                  datavenc = response.data?.registros[0]?.data_vencimento
                  linha_digitavel = response.data?.registros[0]?.linha_digitavel
                  impresso = response.data?.registros[0]?.impresso
                  valorCorrigido = valor.replace(".", ",");
                  datavencCorrigida = datavenc.split('-').reverse().join('/')


                  //INFORMAÇÕES BOLETO
                  const bodyBoleto = {
                    text: formatBody(`Berikut adalah salinan kedua tagihan Anda!\n\n*Tagihan:* ${idboleto}\n*Nama:* ${nome}\n*Nilai:* R$ ${valorCorrigido}\n*Tanggal Jatuh Tempo:* ${datavencCorrigida}\n\nSaya akan mengirimkan *kode batang* pada pesan berikutnya untuk memudahkan Anda menyalinnya!`, contact),
                  };
                  //await sleep(2000)
                  //await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyBoleto);
                  //LINHA DIGITAVEL
                  if (impresso !== "S") {
                    //IMPRIME BOLETO PARA GERAR CODIGO BARRAS
                    var boletopdf = {
                      method: 'GET',
                      url: `${urlixc}/webservice/v1/get_boleto`,
                      headers: {
                        ixcsoft: 'listar',
                        Authorization: `Basic ${ixckeybase64}`
                      },
                      data: {
                        boletos: idboleto,
                        juro: 'N',
                        multa: 'N',
                        atualiza_boleto: 'N',
                        tipo_boleto: 'arquivo',
                        base64: 'S'
                      }
                    };

                    axios.request(boletopdf as any).then(function (response) {
                    }).catch(function (error) {
                      console.error(error);
                    });
                  }

                  //SE TIVER PIX ENVIA O PIX
                  var optionsPix = {
                    method: 'GET',
                    url: `${urlixc}/webservice/v1/get_pix`,
                    headers: {
                      ixcsoft: 'listar',
                      Authorization: `Basic ${ixckeybase64}`
                    },
                    data: { id_areceber: idboleto }
                  };

                  axios.request(optionsPix as any).then(async function (response) {
                    let tipo;
                    let pix;

                    tipo = response.data?.type;
                    pix = response.data?.pix?.qrCode?.qrcode;
                    if (tipo === 'success') {
                      const bodyBoletoPix = {
                        text: formatBody(`Berikut adalah salinan kedua tagihan Anda!\n\n*Tagihan:* ${idboleto}\n*Nama:* ${nome}\n*Nilai:* R$ ${valorCorrigido}\n*Tanggal Jatuh Tempo:* ${datavencCorrigida}\n\nSaya akan mengirimkan *Kode Batang* dan *PIX* tinggal klik mana yang ingin Anda gunakan untuk menyalin! Setelah itu lakukan pembayaran di bank Anda`, contact),
                      };
                      await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyBoletoPix);
                      const body_linhadigitavel = {
                        text: formatBody("Ini adalah *Kode Batang*", contact),
                      };
                      await sleep(2000)
                      await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body_linhadigitavel);
                      await sleep(2000)
                      const body_linha_digitavel = {
                        text: formatBody(`${linha_digitavel}`, contact),
                      };
                      await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body_linha_digitavel);
                      const body_pix = {
                        text: formatBody("Ini adalah *PIX Copia e Cola*", contact),
                      };
                      await sleep(2000)
                      await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body_pix);
                      await sleep(2000)
                      const body_pix_dig = {
                        text: formatBody(`${pix}`, contact),
                      };
                      await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body_pix_dig);
                      const body_pixqr = {
                        text: formatBody("QR CODE *PIX*", contact),
                      };
                      await sleep(2000)
                      await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body_pixqr);
                      let linkBoleto = `https://chart.googleapis.com/chart?cht=qr&chs=500x500&chld=L|0&chl=${pix}`
                      await sleep(2000)
                      await sendMessageImage(wbot, contact, ticket, linkBoleto, '')
                      ///VE SE ESTA BLOQUEADO PARA LIBERAR!
                      var optionscontrato = {
                        method: 'POST',
                        url: `${urlixc}/webservice/v1/cliente_contrato`,
                        headers: {
                          ixcsoft: 'listar',
                          Authorization: `Basic ${ixckeybase64}`
                        },
                        data: {
                          qtype: 'cliente_contrato.id_cliente',
                          query: id,
                          oper: '=',
                          page: '1',
                          rp: '1',
                          sortname: 'cliente_contrato.id',
                          sortorder: 'asc'
                        }
                      };
                      axios.request(optionscontrato as any).then(async function (response) {
                        let status_internet;
                        let id_contrato;
                        status_internet = response.data?.registros[0]?.status_internet;
                        id_contrato = response.data?.registros[0]?.id;
                        if (status_internet !== 'A') {
                          const bodyPdf = {
                            text: formatBody(`*${nome}* kami juga melihat bahwa koneksi Anda diblokir! Kami akan membukanya untuk Anda.`, contact),
                          };
                          await sleep(2000)
                          await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyPdf);
                          const bodyqrcode = {
                            text: formatBody(`Kami sedang membuka akses Anda. Mohon tunggu!`, contact),
                          };
                          await sleep(2000)
                          await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyqrcode);
                          //REALIZANDO O DESBLOQUEIO
                          var optionsdesbloqeuio = {
                            method: 'POST',
                            url: `${urlixc}/webservice/v1/desbloqueio_confianca`,
                            headers: {
                              Authorization: `Basic ${ixckeybase64}`
                            },
                            data: { id: id_contrato }
                          };

                          axios.request(optionsdesbloqeuio as any).then(async function (response) {
                            let tipo;
                            let mensagem;
                            tipo = response.data?.tipo;
                            mensagem = response.data?.mensagem;
                            if (tipo === 'sucesso') {
                              //DESCONECTANDO O CLIENTE PARA VOLTAR O ACESSO
                              var optionsRadius = {
                                method: 'GET',
                                url: `${urlixc}/webservice/v1/radusuarios`,
                                headers: {
                                  ixcsoft: 'listar',
                                  Authorization: `Basic ${ixckeybase64}`
                                },
                                data: {
                                  qtype: 'radusuarios.id_cliente',
                                  query: id,
                                  oper: '=',
                                  page: '1',
                                  rp: '1',
                                  sortname: 'radusuarios.id',
                                  sortorder: 'asc'
                                }
                              };

                              axios.request(optionsRadius as any).then(async function (response) {
                                let tipo;
                                tipo = response.data?.type;
                                if (tipo === 'success') {
                                  const body_mensagem = {
                                    text: formatBody(`${mensagem}`, contact),
                                  };
                                  await sleep(2000)
                                  await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body_mensagem);
                                  const bodyPdf = {
                                    text: formatBody(`Kami sudah melakukan prosedur pembukaan! Mohon tunggu hingga 5 menit dan lihat apakah koneksi Anda kembali! .\n\nJika belum kembali, silakan hubungi kami dan berbicara dengan petugas!`, contact),
                                  };
                                  await sleep(2000)
                                  await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyPdf);
                                  const bodyfinaliza = {
                                    text: formatBody(`Kami mengakhiri percakapan ini! Jika perlu, silakan hubungi kami kembali!`, contact),
                                  };
                                  await sleep(2000)
                                  await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyfinaliza);
                                  await UpdateTicketService({
                                    ticketData: { status: "closed" },
                                    ticketId: ticket.id,
                                    companyId: ticket.companyId,
                                  });
                                } else {
                                  await sleep(2000)
                                  await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body_mensagem);
                                  const bodyPdf = {
                                    text: formatBody(`Kami butuh Anda untuk *cabut* perangkat dari stopkontak.\n\n*CATATAN: Hanya cabut dari stopkontak.* \nTunggu 1 menit dan colokkan kembali!`, contact),
                                  };
                                  await sleep(2000)
                                  await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyPdf);
                                  const bodyqrcode = {
                                    text: formatBody(`Lihat apakah akses Anda sudah kembali! Jika belum, silakan hubungi kami dan berbicara dengan petugas!`, contact),
                                  };
                                  await sleep(2000)
                                  await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyqrcode);
                                  const bodyfinaliza = {
                                    text: formatBody(`Kami mengakhiri percakapan ini! Jika perlu, silakan hubungi kami kembali!`, contact),
                                  };
                                  await sleep(2000)
                                  await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyfinaliza);
                                  await UpdateTicketService({
                                    ticketData: { status: "closed" },
                                    ticketId: ticket.id,
                                    companyId: ticket.companyId,
                                  });
                                }
                              }).catch(function (error) {
                                console.error(error);
                              });
                              //FIM DA DESCONEXÃO
                            } else {
                              const bodyerro = {
                                text: formatBody(`Oops! Terjadi kesalahan dan kami tidak bisa membuka blokirnya! Ketik *#* dan berbicara dengan petugas!`, contact),
                              };
                              await sleep(2000)
                              await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyerro);
                            }

                          }).catch(async function (error) {
                            const bodyerro = {
                              text: formatBody(`Oops! Terjadi kesalahan, ketik *#* dan berbicara dengan petugas!`, contact),
                            };
                            await sleep(2000)
                            await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyerro);
                          });
                        } else {
                          const bodyfinaliza = {
                            text: formatBody(`Kami mengakhiri percakapan ini! Jika perlu, silakan hubungi kami kembali!`, contact),
                          };
                          await sleep(8000)
                          await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyfinaliza);
                          await UpdateTicketService({
                            ticketData: { status: "closed" },
                            ticketId: ticket.id,
                            companyId: ticket.companyId,
                          });
                        }

                        //
                      }).catch(async function (error) {

                        const bodyerro = {
                          text: formatBody(`Oops! Terjadi kesalahan, ketik *#* dan berbicara dengan petugas!`, contact),
                        };
                        await sleep(2000)
                        await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyerro);
                      });
                      ///VE SE ESTA BLOQUEADO PARA LIBERAR!
                    } else {
                      const bodyBoleto = {
                        text: formatBody(`Berikut adalah salinan kedua tagihan Anda!\n\n*Tagihan:* ${idboleto}\n*Nama:* ${nome}\n*Nilai:* R$ ${valorCorrigido}\n*Tanggal Jatuh Tempo:* ${datavencCorrigida}\n\nKlik di bawah untuk menyalin kode batang, setelah itu lakukan pembayaran di bank Anda!`, contact),
                      };
                      await sleep(2000)
                      await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyBoleto);
                      const body = {
                        text: formatBody(`Ini adalah *Kode Batang*`, contact),
                      };
                      await sleep(2000)
                      await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body);
                      await sleep(2000)
                      const body_linha_digitavel = {
                        text: formatBody(`${linha_digitavel}`, contact),
                      };
                      await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body_linha_digitavel);
                      ///VE SE ESTA BLOQUEADO PARA LIBERAR!
                      var optionscontrato = {
                        method: 'POST',
                        url: `${urlixc}/webservice/v1/cliente_contrato`,
                        headers: {
                          ixcsoft: 'listar',
                          Authorization: `Basic ${ixckeybase64}`
                        },
                        data: {
                          qtype: 'cliente_contrato.id_cliente',
                          query: id,
                          oper: '=',
                          page: '1',
                          rp: '1',
                          sortname: 'cliente_contrato.id',
                          sortorder: 'asc'
                        }
                      };
                      axios.request(optionscontrato as any).then(async function (response) {
                        let status_internet;
                        let id_contrato;
                        status_internet = response.data?.registros[0]?.status_internet;
                        id_contrato = response.data?.registros[0]?.id;
                        if (status_internet !== 'A') {
                          const bodyPdf = {
                            text: formatBody(`*${nome}* kami juga melihat bahwa koneksi Anda diblokir! Kami akan membukanya untuk Anda.`, contact),
                          };
                          await sleep(2000)
                          await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyPdf);
                          const bodyqrcode = {
                            text: formatBody(`Kami sedang membuka akses Anda. Mohon tunggu!`, contact),
                          };
                          await sleep(2000)
                          await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyqrcode);
                          //REALIZANDO O DESBLOQUEIO
                          var optionsdesbloqeuio = {
                            method: 'POST',
                            url: `${urlixc}/webservice/v1/desbloqueio_confianca`,
                            headers: {
                              Authorization: `Basic ${ixckeybase64}`
                            },
                            data: { id: id_contrato }
                          };

                          axios.request(optionsdesbloqeuio as any).then(async function (response) {
                            let tipo;
                            let mensagem;
                            tipo = response.data?.tipo;
                            mensagem = response.data?.mensagem;
                            if (tipo === 'sucesso') {
                              //DESCONECTANDO O CLIENTE PARA VOLTAR O ACESSO
                              var optionsRadius = {
                                method: 'GET',
                                url: `${urlixc}/webservice/v1/radusuarios`,
                                headers: {
                                  ixcsoft: 'listar',
                                  Authorization: `Basic ${ixckeybase64}`
                                },
                                data: {
                                  qtype: 'radusuarios.id_cliente',
                                  query: id,
                                  oper: '=',
                                  page: '1',
                                  rp: '1',
                                  sortname: 'radusuarios.id',
                                  sortorder: 'asc'
                                }
                              };

                              axios.request(optionsRadius as any).then(async function (response) {
                                let tipo;
                                tipo = response.data?.type;
                                const body_mensagem = {
                                  text: formatBody(`${mensagem}`, contact),
                                };
                                if (tipo === 'success') {
                                  await sleep(2000)
                                  await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body_mensagem);
                                  const bodyPdf = {
                                    text: formatBody(`Kami sudah melakukan prosedur pembukaan! Mohon tunggu hingga 5 menit dan lihat apakah koneksi Anda kembali! .\n\nJika belum kembali, silakan hubungi kami dan berbicara dengan petugas!`, contact),
                                  };
                                  await sleep(2000)
                                  await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyPdf);
                                  const bodyfinaliza = {
                                    text: formatBody(`Kami mengakhiri percakapan ini! Jika perlu, silakan hubungi kami kembali!`, contact),
                                  };
                                  await sleep(2000)
                                  await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyfinaliza);
                                  await UpdateTicketService({
                                    ticketData: { status: "closed" },
                                    ticketId: ticket.id,
                                    companyId: ticket.companyId,
                                  });
                                } else {
                                  await sleep(2000)
                                  await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body_mensagem);
                                  const bodyPdf = {
                                    text: formatBody(`Kami butuh Anda untuk *cabut* perangkat dari stopkontak.\n\n*CATATAN: Hanya cabut dari stopkontak.* \nTunggu 1 menit dan colokkan kembali!`, contact),
                                  };
                                  await sleep(2000)
                                  await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyPdf);
                                  const bodyqrcode = {
                                    text: formatBody(`Lihat apakah akses Anda sudah kembali! Jika belum, silakan hubungi kami dan berbicara dengan petugas!`, contact),
                                  };
                                  await sleep(2000)
                                  await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyqrcode);
                                  const bodyfinaliza = {
                                    text: formatBody(`Kami mengakhiri percakapan ini! Jika perlu, silakan hubungi kami kembali!`, contact),
                                  };
                                  await sleep(2000)
                                  await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyfinaliza);
                                  await UpdateTicketService({
                                    ticketData: { status: "closed" },
                                    ticketId: ticket.id,
                                    companyId: ticket.companyId,
                                  });
                                }
                              }).catch(function (error) {
                                console.error(error);
                              });
                              //FIM DA DESCONEXÃO
                            } else {
                              const bodyerro = {
                                text: formatBody(`Oops! Terjadi kesalahan dan kami tidak bisa membuka blokirnya! Ketik *#* dan berbicara dengan petugas!`, contact),
                              };
                              await sleep(2000)
                              await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyerro);
                              const msg_errolbieracao = {
                                text: formatBody(`${msgerrolbieracao}`, contact),
                              };
                              await sleep(2000)
                              await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, msg_errolbieracao);
                              const bodyerroatendent = {
                                text: formatBody(`Ketik *#* untuk kembali ke menu dan berbicara dengan petugas!`, contact),
                              };
                              await sleep(2000)
                              await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyerroatendent);
                            }

                          }).catch(async function (error) {
                            const bodyerro = {
                              text: formatBody(`Oops! Terjadi kesalahan, ketik *#* dan berbicara dengan petugas!`, contact),
                            };
                            await sleep(2000)
                            await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyerro);
                          });
                        } else {
                          const bodyfinaliza = {
                            text: formatBody(`Kami mengakhiri percakapan ini! Jika perlu, silakan hubungi kami kembali!`, contact),
                          };
                          await sleep(8000)
                          await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyfinaliza);
                          await UpdateTicketService({
                            ticketData: { status: "closed" },
                            ticketId: ticket.id,
                            companyId: ticket.companyId,
                          });
                        }

                        //
                      }).catch(async function (error) {

                        const bodyerro = {
                          text: formatBody(`Oops! Terjadi kesalahan, ketik *#* dan berbicara dengan petugas!`, contact),
                        };
                        await sleep(2000)
                        await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, bodyerro);
                      });
                      ///VE SE ESTA BLOQUEADO PARA LIBERAR!
                    }
                  }).catch(function (error) {
                    const body = {
                      text: formatBody(`Oops! Terjadi kesalahan, ketik *#* dan berbicara dengan petugas!`, contact),
                    };
                    await sleep(2000)
                    await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body);
                  });
                }).catch(async function (error) {
                  const body = {
                    text: formatBody(`*Oops!* Terjadi kesalahan! Ketik *#* dan berbicara dengan petugas!`, contact),
                  };
                  await sleep(2000)
                  await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body);
                });
              }
            }).catch(async function (error) {
              const body = {
                text: formatBody(`*Oops!* Terjadi kesalahan! Ketik *#* dan berbicara dengan petugas!`, contact),
              };
              await sleep(2000)
              await wbot.sendMessage(`${ticket.contact.number}@${ticket.isGroup ? "g.us" : "s.whatsapp.net"}`, body);
            });
          }
        }
      }
    }

  }
}

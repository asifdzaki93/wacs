export default {
  formId: 'checkoutForm',
  formField: {
    firstName: {
      name: 'firstName',
      label: 'Nama lengkap*',
      requiredErrorMsg: 'Nama lengkap wajib diisi'
    },
    lastName: {
      name: 'lastName',
      label: 'Nama belakang*',
      requiredErrorMsg: 'Nama belakang wajib diisi'
    },
    address1: {
      name: 'address2',
      label: 'Alamat*',
      requiredErrorMsg: 'Alamat wajib diisi'
    },

    city: {
      name: 'city',
      label: 'Kota*',
      requiredErrorMsg: 'Kota wajib diisi'
    },
    state: {
      name: 'state',
      label: 'Provinsi*',
      requiredErrorMsg: 'Provinsi wajib diisi'
    },
    zipcode: {
      name: 'zipcode',
      label: 'Kode Pos*',
      requiredErrorMsg: 'Kode Pos wajib diisi',
      invalidErrorMsg: 'Format Kode Pos tidak valid'
    },
    country: {
      name: 'country',
      label: 'Negara*',
      requiredErrorMsg: 'Negara wajib diisi'
    },
    useAddressForPaymentDetails: {
      name: 'useAddressForPaymentDetails',
      label: 'Gunakan alamat ini untuk detail pembayaran'
    },
    invoiceId: {
      name: 'invoiceId',
      label: 'Gunakan invoiceId ini'
    },
    nameOnCard: {
      name: 'nameOnCard',
      label: 'Nama pada kartu*',
      requiredErrorMsg: 'Nama pada kartu wajib diisi'
    },
    cardNumber: {
      name: 'cardNumber',
      label: 'Nomor kartu*',
      requiredErrorMsg: 'Nomor kartu wajib diisi',
      invalidErrorMsg: 'Nomor kartu tidak valid (misalnya 4111111111111)'
    },
    expiryDate: {
      name: 'expiryDate',
      label: 'Tanggal kadaluarsa*',
      requiredErrorMsg: 'Tanggal kadaluarsa wajib diisi',
      invalidErrorMsg: 'Tanggal kadaluarsa tidak valid'
    },
    cvv: {
      name: 'cvv',
      label: 'CVV*',
      requiredErrorMsg: 'CVV wajib diisi',
      invalidErrorMsg: 'CVV tidak valid (misalnya 357)'
    }
  }
};

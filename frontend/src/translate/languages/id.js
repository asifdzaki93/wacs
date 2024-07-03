const messages = {
	id: {
		translations: {
			signup: {
				title: "Daftar",
				toasts: {
					success: "Pengguna berhasil dibuat! Silakan masuk!",
					fail: "Kesalahan saat membuat pengguna. Periksa data yang dilaporkan.",
				},
				form: {
					name: "Nama",
					email: "Email",
					password: "Kata Sandi",
				},
				buttons: {
					submit: "Daftar",
					login: "Sudah punya akun? Masuk!",
				},
			},
			login: {
				title: "Masuk",
				form: {
					email: "Email",
					password: "Kata Sandi",
				},
				buttons: {
					submit: "Masuk",
					register: "Belum punya akun? Daftar!",
				},
			},
			plans: {
				form: {
					name: "Nama",
					users: "Pengguna",
					connections: "Koneksi",
					campaigns: "Kampanye",
					schedules: "Jadwal",
					enabled: "Diaktifkan",
					disabled: "Dinonaktifkan",
					clear: "Bersihkan",
					delete: "Hapus",
					save: "Simpan",
					yes: "Ya",
					no: "Tidak",
					money: "Rp",
				},
			},
			companies: {
				title: "Daftarkan Perusahaan",
				form: {
					name: "Nama Perusahaan",
					plan: "Rencana",
					token: "Token",
					submit: "Daftar",
					success: "Perusahaan berhasil dibuat!",
				},
			},
			auth: {
				toasts: {
					success: "Login berhasil!",
				},
				token: "Token",
			},
			dashboard: {
				charts: {
					perDay: {
						title: "Tiket hari ini: ",
					},
				},
			},
			connections: {
				title: "Koneksi",
				toasts: {
					deleted: "Koneksi WhatsApp berhasil dihapus!",
				},
				confirmationModal: {
					deleteTitle: "Hapus",
					deleteMessage: "Anda yakin? Tindakan ini tidak dapat dibatalkan.",
					disconnectTitle: "Putuskan",
					disconnectMessage: "Anda yakin? Anda harus membaca kode QR lagi.",
				},
				buttons: {
					add: "Tambahkan WhatsApp",
					disconnect: "Putuskan",
					tryAgain: "Coba Lagi",
					qrcode: "KODE QR",
					newQr: "KODE QR Baru",
					connecting: "Menghubungkan",
				},
				toolTips: {
					disconnected: {
						title: "Gagal memulai sesi WhatsApp",
						content: "Pastikan ponsel Anda terhubung ke internet dan coba lagi, atau minta kode QR baru",
					},
					qrcode: {
						title: "Menunggu pembacaan kode QR",
						content: "Klik tombol 'KODE QR' dan baca kode QR dengan ponsel Anda untuk memulai sesi",
					},
					connected: {
						title: "Koneksi terhubung",
					},
					timeout: {
						title: "Koneksi dengan ponsel telah terputus",
						content: "Pastikan ponsel Anda terhubung ke internet dan WhatsApp terbuka, atau klik tombol 'Putuskan' untuk mendapatkan kode QR baru",
					},
				},
				table: {
					name: "Nama",
					status: "Status",
					lastUpdate: "Pembaruan Terakhir",
					default: "Default",
					actions: "Tindakan",
					session: "Sesi",
				},
			},
			whatsappModal: {
				title: {
					add: "Tambahkan WhatsApp",
					edit: "Edit WhatsApp",
				},
				tabs: {
					general: "Umum",
					messages: "Pesan",
					assessments: "Penilaian",
					integrations: "Integrasi",
					schedules: "Jam Kerja",
				},
				form: {
					name: "Nama",
					default: "Default",
					sendIdQueue: "Antrian",
					timeSendQueue: "Alihkan ke antrian dalam X menit",
					queueRedirection: "Pengalihan Antrian",
					outOfHoursMessage: "Pesan di Luar Jam Kerja",
					queueRedirectionDesc: "Pilih antrian untuk kontak tanpa antrian untuk dialihkan",
					prompt: "Prompt",
					expiresTicket: "Tutup obrolan terbuka setelah x menit",
					expiresInactiveMessage: "Pesan Penutupan Obrolan Tidak Aktif",
					greetingMessage: "Pesan Sambutan",
					complationMessage: "Pesan Penyelesaian",
				},
				buttons: {
					okAdd: "Tambah",
					okEdit: "Simpan",
					cancel: "Batal",
				},
				success: "WhatsApp berhasil disimpan.",
			},
			qrCode: {
				message: "Baca kode QR untuk memulai sesi",
			},
			contacts: {
				title: "Kontak",
				toasts: {
					deleted: "Kontak berhasil dihapus!",
				},
				searchPlaceholder: "Cari ...",
				confirmationModal: {
					deleteTitle: "Hapus",
					deleteAllTitle: "Hapus Semua",
					importTitle: "Impor kontak",
					deleteMessage: "Anda yakin ingin menghapus kontak ini? Semua tiket terkait akan hilang.",
					deleteAllMessage: "Anda yakin ingin menghapus semua kontak? Semua tiket terkait akan hilang.",
					importMessage: "Apakah Anda ingin mengimpor semua kontak dari ponsel?",
				},
				buttons: {
					import: "Impor Kontak",
					importSheet: "Impor Excel",
					add: "Tambah Kontak",
					export: "Ekspor Kontak",
					delete: "Hapus Semua Kontak",
				},
				table: {
					name: "Nama",
					whatsapp: "WhatsApp",
					email: "Email",
					actions: "Tindakan",
				},
			},
			queueIntegrationModal: {
				title: {
					add: "Tambah Proyek",
					edit: "Edit Proyek",
				},
				form: {
					id: "ID",
					type: "Tipe",
					name: "Nama",
					projectName: "Nama Proyek",
					language: "Bahasa",
					jsonContent: "Konten JSON",
					urlN8N: "URL",
					typebotSlug: "Typebot - Slug",
					typebotExpires: "Waktu Kedaluwarsa Percakapan (dalam menit)",
					typebotKeywordFinish: "Kata Kunci untuk Mengakhiri Tiket",
					typebotKeywordRestart: "Kata Kunci untuk Mengulang Alur",
					typebotRestartMessage: "Pesan Saat Mengulang Percakapan",
					typebotUnknownMessage: "Pesan Opsi Tidak Valid",
					typebotDelayMessage: "Penundaan (ms) antara pesan",
				},
				buttons: {
					okAdd: "Tambah",
					okEdit: "Simpan",
					cancel: "Batal",
					test: "Uji Bot",
				},
				messages: {
					testSuccess: "Integrasi berhasil diuji!",
					addSuccess: "Integrasi berhasil ditambahkan.",
					editSuccess: "Integrasi berhasil diedit.",
				},
			},
			sideMenu: {
				name: "Menu Samping Awal",
				note: "Jika diaktifkan, menu samping akan dimulai dalam keadaan tertutup",
				options: {
					enabled: "Buka",
					disabled: "Tutup",
				},
			},
			promptModal: {
				form: {
					name: "Nama",
					prompt: "Prompt",
					voice: "Suara",
					max_tokens: "Maksimum Token dalam Tanggapan",
					temperature: "Temperatur",
					apikey: "Kunci API",
					max_messages: "Maksimum Pesan dalam Riwayat",
					voiceKey: "Kunci API Suara",
					voiceRegion: "Wilayah Suara",
				},
				success: "Prompt berhasil disimpan!",
				title: {
					add: "Tambah Prompt",
					edit: "Edit Prompt",
				},
				buttons: {
					okAdd: "Tambah",
					okEdit: "Simpan",
					cancel: "Batal",
				},
			},
			prompts: {
				title: "Prompts",
				table: {
					name: "Nama",
					queue: "Departemen/Antrian",
					max_tokens: "Maksimum Token dalam Tanggapan",
					actions: "Tindakan",
				},
				confirmationModal: {
					deleteTitle: "Hapus",
					deleteMessage: "Anda yakin? Tindakan ini tidak dapat dibatalkan!",
				},
				buttons: {
					add: "Tambah Prompt",
				},
			},
			contactModal: {
				title: {
					add: "Tambah kontak",
					edit: "Edit kontak",
				},
				form: {
					mainInfo: "Detail kontak",
					extraInfo: "Informasi tambahan",
					name: "Nama",
					number: "Nomor WhatsApp",
					email: "Email",
					extraName: "Nama bidang",
					extraValue: "Nilai",
					whatsapp: "Koneksi Asal",
				},
				buttons: {
					addExtraInfo: "Tambah informasi",
					okAdd: "Tambah",
					okEdit: "Simpan",
					cancel: "Batal",
				},
				success: "Kontak berhasil disimpan.",
			},
			queueModal: {
				title: {
					add: "Tambah antrian",
					edit: "Edit antrian",
				},
				confirmationModal: {
					deleteTitle: "Hapus",
				},
				form: {
					name: "Nama",
					color: "Warna",
					greetingMessage: "Pesan Sambutan",
					complationMessage: "Pesan Penyelesaian",
					outOfHoursMessage: "Pesan di Luar Jam Kerja",
					ratingMessage: "Pesan Penilaian",
					token: "Token",
					orderQueue: "Urutan Antrian (Bot)",
					integrationId: "Integrasi",
				},
				buttons: {
					okAdd: "Tambah",
					okEdit: "Simpan",
					cancel: "Batal",
					attach: "Lampirkan File",
				},
			},
			userModal: {
				title: {
					add: "Tambah pengguna",
					edit: "Edit pengguna",
				},
				form: {
					name: "Nama",
					email: "Email",
					password: "Kata Sandi",
					profile: "Profil",
					whatsapp: "Koneksi Default",
					allTicket: "Tiket Tanpa Antrian [Tak Terlihat]",
					allTicketEnabled: "Diaktifkan",
					allTicketDesabled: "Dinonaktifkan",
				},
				buttons: {
					okAdd: "Tambah",
					okEdit: "Simpan",
					cancel: "Batal",
				},
				success: "Pengguna berhasil disimpan.",
			},
			scheduleModal: {
				title: {
					add: "Jadwal Baru",
					edit: "Edit Jadwal",
				},
				form: {
					body: "Pesan",
					contact: "Kontak",
					sendAt: "Tanggal Penjadwalan",
					sentAt: "Tanggal Terkirim",
				},
				buttons: {
					okAdd: "Tambah",
					okEdit: "Simpan",
					cancel: "Batal",
				},
				success: "Jadwal berhasil disimpan.",
			},
			tagModal: {
				title: {
					add: "Tag Baru",
					edit: "Edit Tag",
				},
				form: {
					name: "Nama",
					color: "Warna",
				},
				buttons: {
					okAdd: "Tambah",
					okEdit: "Simpan",
					cancel: "Batal",
				},
				success: "Tag berhasil disimpan.",
			},
			chat: {
				noTicketMessage: "Pilih tiket untuk memulai obrolan.",
			},
			uploads: {
				titles: {
					titleUploadMsgDragDrop: "TARIK DAN LEPAS FILE KE BIDANG DI BAWAH",
					titleFileList: "Daftar File",
				},
			},
			ticketsManager: {
				buttons: {
					newTicket: "Baru",
				},
			},
			ticketsQueueSelect: {
				placeholder: "Antrian",
			},
			tickets: {
				toasts: {
					deleted: "Tiket yang Anda gunakan telah dihapus.",
				},
				notification: {
					message: "Pesan dari",
				},
				tabs: {
					open: { title: "Terbuka" },
					closed: { title: "Selesai" },
					search: { title: "Cari" },
				},
				search: {
					placeholder: "Cari tiket dan pesan",
				},
				buttons: {
					showAll: "Semua",
				},
			},
			transferTicketModal: {
				title: "Transfer Tiket",
				fieldLabel: "Ketik untuk mencari pengguna",
				fieldQueueLabel: "Transfer ke antrian",
				fieldQueuePlaceholder: "Pilih antrian",
				noOptions: "Tidak ada pengguna dengan nama ini ditemukan",
				buttons: {
					ok: "Transfer",
					cancel: "Batal",
				},
			},
			ticketsList: {
				pendingHeader: "Antrian",
				assignedHeader: "Dikerjakan",
				noTicketsTitle: "Tidak ada apa-apa di sini!",
				noTicketsMessage: "Tidak ada tiket ditemukan dengan status atau istilah pencarian ini.",
				buttons: {
					accept: "Terima",
					closed: "Tutup",
					reopen: "Buka Kembali",
				},
			},
			newTicketModal: {
				title: "Buat Tiket",
				fieldLabel: "Ketik untuk mencari kontak",
				add: "Tambah",
				buttons: {
					ok: "Simpan",
					cancel: "Batal",
				},
			},
			mainDrawer: {
				listItems: {
					dashboard: "Dasbor",
					connections: "Koneksi",
					tickets: "Tiket",
					quickMessages: "Pesan Cepat",
					contacts: "Kontak",
					queues: "Antrian & Chatbot",
					tags: "Tag",
					administration: "Administrasi",
					users: "Pengguna",
					settings: "Pengaturan",
					helps: "Bantuan",
					messagesAPI: "API",
					schedules: "Jadwal",
					campaigns: "Kampanye",
					annoucements: "Pengumuman",
					chats: "Obrolan Internal",
					financeiro: "Keuangan",
					files: "Daftar File",
					prompts: "Open.Ai",
					queueIntegration: "Integrasi",
				},
				appBar: {
					notRegister: "Tidak ada pemberitahuan",
					user: {
						profile: "Profil",
						logout: "Keluar",
					},
				},
			},
			queueIntegration: {
				title: "Integrasi",
				table: {
					id: "ID",
					type: "Tipe",
					name: "Nama",
					projectName: "Nama Proyek",
					language: "Bahasa",
					lastUpdate: "Pembaruan Terakhir",
					actions: "Tindakan",
				},
				buttons: {
					add: "Tambah Proyek",
				},
				searchPlaceholder: "Cari...",
				confirmationModal: {
					deleteTitle: "Hapus",
					deleteMessage: "Anda yakin? Tindakan ini tidak dapat dibatalkan dan akan dihapus dari antrian dan koneksi yang terhubung.",
				},
			},
			files: {
				title: "Daftar File",
				table: {
					name: "Nama",
					contacts: "Kontak",
					actions: "Tindakan",
				},
				toasts: {
					deleted: "Daftar berhasil dihapus!",
					deletedAll: "Semua daftar berhasil dihapus!",
				},
				buttons: {
					add: "Tambah",
					deleteAll: "Hapus Semua",
				},
				confirmationModal: {
					deleteTitle: "Hapus",
					deleteAllTitle: "Hapus Semua",
					deleteMessage: "Anda yakin ingin menghapus daftar ini?",
					deleteAllMessage: "Anda yakin ingin menghapus semua daftar?",
				},
			},
			messagesAPI: {
				title: "API",
				textMessage: {
					number: "Nomor",
					body: "Pesan",
					token: "Token terdaftar",
				},
				mediaMessage: {
					number: "Nomor",
					body: "Nama File",
					media: "File",
					token: "Token terdaftar",
				},
			},
			notifications: {
				noTickets: "Tidak ada pemberitahuan.",
			},
			quickMessages: {
				title: "Pesan Cepat",
				searchPlaceholder: "Cari...",
				noAttachment: "Tidak ada lampiran",
				confirmationModal: {
					deleteTitle: "Hapus",
					deleteMessage: "Tindakan ini tidak dapat dibatalkan! Apakah Anda ingin melanjutkan?",
				},
				buttons: {
					add: "Tambah",
					attach: "Lampirkan File",
					cancel: "Batal",
					edit: "Edit",
				},
				toasts: {
					success: "Pintasan berhasil ditambahkan!",
					deleted: "Pintasan berhasil dihapus!",
				},
				dialog: {
					title: "Pesan Cepat",
					shortcode: "Pintasan",
					message: "Respon",
					save: "Simpan",
					cancel: "Batal",
					geral: "Izinkan edit",
					add: "Tambah",
					edit: "Edit",
					visao: "Izinkan tampilan",
				},
				table: {
					shortcode: "Pintasan",
					message: "Pesan",
					actions: "Tindakan",
					mediaName: "Nama File",
					status: "Status",
				},
			},
			messageVariablesPicker: {
				label: "Variabel yang Tersedia",
				vars: {
					contactFirstName: "Nama Depan",
					contactName: "Nama",
					greeting: "Salam",
					protocolNumber: "Protokol",
					date: "Tanggal",
					hour: "Jam",
				},
			},
			contactLists: {
				title: "Daftar Kontak",
				table: {
					name: "Nama",
					contacts: "Kontak",
					actions: "Tindakan",
				},
				buttons: {
					add: "Daftar Baru",
				},
				dialog: {
					name: "Nama",
					company: "Perusahaan",
					okEdit: "Edit",
					okAdd: "Tambah",
					add: "Tambah",
					edit: "Edit",
					cancel: "Batal",
				},
				confirmationModal: {
					deleteTitle: "Hapus",
					deleteMessage: "Tindakan ini tidak dapat dibatalkan.",
				},
				toasts: {
					deleted: "Rekaman dihapus",
				},
			},
			contactListItems: {
				title: "Kontak",
				searchPlaceholder: "Cari",
				buttons: {
					add: "Baru",
					lists: "Daftar",
					import: "Impor",
				},
				dialog: {
					name: "Nama",
					number: "Nomor",
					whatsapp: "WhatsApp",
					email: "Email",
					okEdit: "Edit",
					okAdd: "Tambah",
					add: "Tambah",
					edit: "Edit",
					cancel: "Batal",
				},
				table: {
					name: "Nama",
					number: "Nomor",
					whatsapp: "WhatsApp",
					email: "Email",
					actions: "Tindakan",
				},
				confirmationModal: {
					deleteTitle: "Hapus",
					deleteMessage: "Tindakan ini tidak dapat dibatalkan.",
					importMessage: "Apakah Anda ingin mengimpor kontak dari lembar ini?",
					importTitle: "Impor",
				},
				toasts: {
					deleted: "Rekaman dihapus",
				},
			},
			campaigns: {
				title: "Kampanye",
				searchPlaceholder: "Cari",
				buttons: {
					add: "Kampanye Baru",
					contactLists: "Daftar Kontak",
				},
				table: {
					name: "Nama",
					whatsapp: "Koneksi",
					contactList: "Daftar Kontak",
					status: "Status",
					scheduledAt: "Dijadwalkan",
					completedAt: "Selesai",
					confirmation: "Konfirmasi",
					actions: "Tindakan",
				},
				dialog: {
					new: "Kampanye Baru",
					update: "Edit Kampanye",
					readonly: "Hanya Baca",
					form: {
						name: "Nama",
						message1: "Pesan 1",
						message2: "Pesan 2",
						message3: "Pesan 3",
						message4: "Pesan 4",
						message5: "Pesan 5",
						confirmationMessage1: "Pesan Konfirmasi 1",
						confirmationMessage2: "Pesan Konfirmasi 2",
						confirmationMessage3: "Pesan Konfirmasi 3",
						confirmationMessage4: "Pesan Konfirmasi 4",
						confirmationMessage5: "Pesan Konfirmasi 5",
						messagePlaceholder: "Konten pesan",
						whatsapp: "Koneksi",
						status: "Status",
						scheduledAt: "Dijadwalkan",
						confirmation: "Konfirmasi",
						contactList: "Daftar Kontak",
						tagList: "Daftar Tag",
						fileList: "Daftar File",
					},
					buttons: {
						add: "Tambah",
						edit: "Perbarui",
						okadd: "Ok",
						cancel: "Batalkan Tembakan",
						restart: "Mulai Ulang Tembakan",
						close: "Tutup",
						attach: "Lampirkan File",
					},
				},
				confirmationModal: {
					deleteTitle: "Hapus",
					deleteMessage: "Tindakan ini tidak dapat dibatalkan.",
				},
				toasts: {
					success: "Operasi berhasil",
					cancel: "Kampanye dibatalkan",
					restart: "Kampanye dimulai ulang",
					deleted: "Rekaman dihapus",
				},
			},
			announcements: {
				active: "Aktif",
				inactive: "Tidak Aktif",
				title: "Pengumuman",
				searchPlaceholder: "Cari",
				buttons: {
					add: "Buat",
					contactLists: "Daftar Kontak",
				},
				table: {
					priority: "Prioritas",
					title: "Judul",
					text: "Teks",
					mediaName: "File",
					status: "Status",
					actions: "Tindakan",
				},
				dialog: {
					edit: "Edit Pengumuman",
					add: "Pengumuman Baru",
					update: "Edit Pengumuman",
					readonly: "Hanya Baca",
					form: {
						priority: "Prioritas",
						title: "Judul",
						text: "Teks",
						mediaPath: "File",
						status: "Status",
					},
					buttons: {
						add: "Tambah",
						edit: "Perbarui",
						okadd: "Ok",
						cancel: "Batal",
						close: "Tutup",
						attach: "Lampirkan File",
					},
				},
				confirmationModal: {
					deleteTitle: "Hapus",
					deleteMessage: "Tindakan ini tidak dapat dibatalkan.",
				},
				toasts: {
					success: "Operasi berhasil",
					deleted: "Rekaman dihapus",
				},
			},
			campaignsConfig: {
				title: "Pengaturan Kampanye",
			},
			queues: {
				title: "Antrian & Chatbot",
				table: {
					id: "ID",
					name: "Nama",
					color: "Warna",
					greeting: "Pesan Sambutan",
					actions: "Tindakan",
					orderQueue: "Urutan Antrian (bot)",
				},
				buttons: {
					add: "Tambah antrian",
				},
				confirmationModal: {
					deleteTitle: "Hapus",
					deleteMessage: "Anda yakin? Tindakan ini tidak dapat dibatalkan! Tiket dalam antrian ini akan tetap ada, tetapi tidak akan memiliki antrian yang ditetapkan.",
				},
			},
			queueSelect: {
				inputLabel: "Antrian",
			},
			users: {
				title: "Pengguna",
				table: {
					id: "ID",
					name: "Nama",
					email: "Email",
					profile: "Profil",
					actions: "Tindakan",
				},
				buttons: {
					add: "Tambah pengguna",
				},
				toasts: {
					deleted: "Pengguna berhasil dihapus.",
				},
				confirmationModal: {
					deleteTitle: "Hapus",
					deleteMessage: "Semua data pengguna akan hilang. Tiket terbuka pengguna ini akan dipindahkan ke antrian.",
				},
			},
			helps: {
				title: "Pusat Bantuan",
			},
			schedules: {
				title: "Jadwal",
				confirmationModal: {
					deleteTitle: "Anda yakin ingin menghapus Jadwal ini?",
					deleteMessage: "Tindakan ini tidak dapat dibatalkan.",
				},
				table: {
					contact: "Kontak",
					body: "Pesan",
					sendAt: "Tanggal Penjadwalan",
					sentAt: "Tanggal Terkirim",
					status: "Status",
					actions: "Tindakan",
				},
				buttons: {
					add: "Jadwal Baru",
				},
				toasts: {
					deleted: "Jadwal berhasil dihapus.",
				},
			},
			tags: {
				title: "Tag",
				confirmationModal: {
					deleteTitle: "Anda yakin ingin menghapus Tag ini?",
					deleteMessage: "Tindakan ini tidak dapat dibatalkan.",
					deleteAllMessage: "Anda yakin ingin menghapus semua Tag?",
					deleteAllTitle: "Hapus Semua",
				},
				table: {
					name: "Nama",
					color: "Warna",
					tickets: "Rekaman Ditandai",
					actions: "Tindakan",
				},
				buttons: {
					add: "Tag Baru",
					deleteAll: "Hapus Semua",
				},
				toasts: {
					deletedAll: "Semua Tag berhasil dihapus!",
					deleted: "Tag berhasil dihapus.",
				},
			},
			settings: {
				success: "Pengaturan berhasil disimpan.",
				title: "Pengaturan",
				settings: {
					userCreation: {
						name: "Pembuatan Pengguna",
						options: {
							enabled: "Diaktifkan",
							disabled: "Dinonaktifkan",
						},
					},
				},
			},
			messagesList: {
				header: {
					assignedTo: "Ditugaskan kepada:",
					buttons: {
						return: "Kembali",
						resolve: "Selesaikan",
						reopen: "Buka Kembali",
						accept: "Terima",
					},
				},
			},
			messagesInput: {
				placeholderOpen: "Ketik pesan",
				placeholderClosed: "Buka kembali atau terima tiket ini untuk mengirim pesan.",
				signMessage: "Tanda Tangan",
			},
			contactDrawer: {
				header: "Detail kontak",
				buttons: {
					edit: "Edit kontak",
				},
				extraInfo: "Informasi Lain",
			},
			fileModal: {
				title: {
					add: "Tambah daftar file",
					edit: "Edit daftar file",
				},
				buttons: {
					okAdd: "Simpan",
					okEdit: "Edit",
					cancel: "Batal",
					fileOptions: "Tambah file",
				},
				form: {
					name: "Nama daftar file",
					message: "Detail daftar file",
					fileOptions: "Daftar file",
					extraName: "Pesan untuk dikirim dengan file",
					extraValue: "Nilai opsi",
				},
				success: "Daftar file berhasil disimpan!",
			},
			ticketOptionsMenu: {
				schedule: "Jadwal",
				delete: "Hapus",
				transfer: "Transfer",
				registerAppointment: "Catatan Kontak",
				appointmentsModal: {
					title: "Catatan Kontak",
					textarea: "Catatan",
					placeholder: "Masukkan informasi yang ingin Anda catat di sini",
				},
				confirmationModal: {
					title: "Hapus tiket",
					titleFrom: "dari kontak ",
					message: "Perhatian! Semua pesan terkait tiket akan hilang.",
				},
				buttons: {
					delete: "Hapus",
					cancel: "Batal",
				},
			},
			confirmationModal: {
				buttons: {
					confirm: "Ok",
					cancel: "Batal",
				},
			},
			messageOptionsMenu: {
				delete: "Hapus",
				reply: "Balas",
				confirmationModal: {
					title: "Hapus pesan?",
					message: "Tindakan ini tidak dapat dibatalkan.",
				},
			},
			backendErrors: {
				ERR_NO_OTHER_WHATSAPP: "Harus ada setidaknya satu koneksi WhatsApp default.",
				ERR_NO_DEF_WAPP_FOUND: "Tidak ada WhatsApp default ditemukan. Periksa halaman koneksi.",
				ERR_WAPP_NOT_INITIALIZED: "Sesi WhatsApp ini tidak diinisialisasi. Periksa halaman koneksi.",
				ERR_WAPP_CHECK_CONTACT: "Tidak dapat memeriksa kontak WhatsApp. Periksa halaman koneksi.",
				ERR_WAPP_INVALID_CONTACT: "Ini bukan nomor WhatsApp yang valid.",
				ERR_WAPP_DOWNLOAD_MEDIA: "Tidak dapat mengunduh media dari WhatsApp. Periksa halaman koneksi.",
				ERR_INVALID_CREDENTIALS: "Kesalahan otentikasi. Silakan coba lagi.",
				ERR_SENDING_WAPP_MSG: "Kesalahan mengirim pesan WhatsApp. Periksa halaman koneksi.",
				ERR_DELETE_WAPP_MSG: "Tidak dapat menghapus pesan dari WhatsApp.",
				ERR_OTHER_OPEN_TICKET: "Sudah ada tiket terbuka untuk kontak ini.",
				ERR_SESSION_EXPIRED: "Sesi kedaluwarsa. Silakan masuk.",
				ERR_USER_CREATION_DISABLED: "Pembuatan pengguna dinonaktifkan oleh administrator.",
				ERR_NO_PERMISSION: "Anda tidak memiliki izin untuk mengakses sumber daya ini.",
				ERR_DUPLICATED_CONTACT: "Sudah ada kontak dengan nomor ini.",
				ERR_NO_SETTING_FOUND: "Tidak ada pengaturan ditemukan dengan ID ini.",
				ERR_NO_CONTACT_FOUND: "Tidak ada kontak ditemukan dengan ID ini.",
				ERR_NO_TICKET_FOUND: "Tidak ada tiket ditemukan dengan ID ini.",
				ERR_NO_USER_FOUND: "Tidak ada pengguna ditemukan dengan ID ini.",
				ERR_NO_WAPP_FOUND: "Tidak ada WhatsApp ditemukan dengan ID ini.",
				ERR_CREATING_MESSAGE: "Kesalahan saat membuat pesan di database.",
				ERR_CREATING_TICKET: "Kesalahan saat membuat tiket di database.",
				ERR_FETCH_WAPP_MSG: "Kesalahan mengambil pesan di WhatsApp, mungkin terlalu lama.",
				ERR_QUEUE_COLOR_ALREADY_EXISTS: "Warna ini sudah digunakan, pilih yang lain.",
				ERR_WAPP_GREETING_REQUIRED: "Pesan sambutan diperlukan jika ada lebih dari satu antrian.",
			},
		},
	},
};

export { messages };

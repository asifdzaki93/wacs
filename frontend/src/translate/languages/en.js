const messages = {
	en: {
		translations: {
			signup: {
				title: "Sign up",
				toasts: {
					success: "User created successfully! Please login!",
					fail: "Error creating user. Check the reported data.",
				},
				form: {
					name: "Name",
					email: "Email",
					password: "Password",
				},
				buttons: {
					submit: "Register",
					login: "Already have an account? Log in!",
				},
			},
			login: {
				title: "Login",
				form: {
					email: "Email",
					password: "Password",
				},
				buttons: {
					submit: "Enter",
					register: "Don't have an account? Register!",
				},
			},
			plans: {
				form: {
					name: "Name",
					users: "Users",
					connections: "Connections",
					campaigns: "Campaigns",
					schedules: "Schedules",
					enabled: "Enabled",
					disabled: "Disabled",
					clear: "Clear",
					delete: "Delete",
					save: "Save",
					yes: "Yes",
					no: "No",
					money: "$",
				},
			},
			companies: {
				title: "Register Company",
				form: {
					name: "Company Name",
					plan: "Plan",
					token: "Token",
					submit: "Register",
					success: "Company created successfully!",
				},
			},
			auth: {
				toasts: {
					success: "Login successfully!",
				},
				token: "Token",
			},
			dashboard: {
				charts: {
					perDay: {
						title: "Tickets today: ",
					},
				},
			},
			connections: {
				title: "Connections",
				toasts: {
					deleted: "WhatsApp connection deleted successfully!",
				},
				confirmationModal: {
					deleteTitle: "Delete",
					deleteMessage: "Are you sure? This action cannot be reverted.",
					disconnectTitle: "Disconnect",
					disconnectMessage: "Are you sure? You'll need to read the QR Code again.",
				},
				buttons: {
					add: "Add WhatsApp",
					disconnect: "Disconnect",
					tryAgain: "Try Again",
					qrcode: "QR CODE",
					newQr: "New QR CODE",
					connecting: "Connecting",
				},
				toolTips: {
					disconnected: {
						title: "Failed to start WhatsApp session",
						content: "Make sure your cell phone is connected to the internet and try again, or request a new QR Code",
					},
					qrcode: {
						title: "Waiting for QR Code read",
						content: "Click on 'QR CODE' button and read the QR Code with your cell phone to start session",
					},
					connected: {
						title: "Connection established",
					},
					timeout: {
						title: "Connection with cell phone has been lost",
						content: "Make sure your cell phone is connected to the internet and WhatsApp is open, or click on 'Disconnect' button to get a new QR code",
					},
				},
				table: {
					name: "Name",
					status: "Status",
					lastUpdate: "Last Update",
					default: "Default",
					actions: "Actions",
					session: "Session",
				},
			},
			whatsappModal: {
				title: {
					add: "Add WhatsApp",
					edit: "Edit WhatsApp",
				},
				tabs: {
					general: "General",
					messages: "Messages",
					assessments: "Assessments",
					integrations: "Integrations",
					schedules: "Working Hours",
				},
				form: {
					name: "Name",
					default: "Default",
					sendIdQueue: "Queue",
					timeSendQueue: "Redirect to queue in X minutes",
					queueRedirection: "Queue Redirection",
					outOfHoursMessage: "Out of Hours Message",
					queueRedirectionDesc: "Select a queue for contacts without a queue to be redirected to",
					prompt: "Prompt",
					expiresTicket: "Close open chats after x minutes",
					expiresInactiveMessage: "Inactive Chat Close Message",
					greetingMessage: "Greeting Message",
					complationMessage: "Completion Message",
				},
				buttons: {
					okAdd: "Add",
					okEdit: "Save",
					cancel: "Cancel",
				},
				success: "WhatsApp saved successfully.",
			},
			qrCode: {
				message: "Read QrCode to start the session",
			},
			contacts: {
				title: "Contacts",
				toasts: {
					deleted: "Contact deleted successfully!",
				},
				searchPlaceholder: "Search ...",
				confirmationModal: {
					deleteTitle: "Delete",
					deleteAllTitle: "Delete All",
					importTitle: "Import contacts",
					deleteMessage: "Are you sure you want to delete this contact? All related tickets will be lost.",
					deleteAllMessage: "Are you sure you want to delete all contacts? All related tickets will be lost.",
					importMessage: "Do you want to import all contacts from the phone?",
				},
				buttons: {
					import: "Import Contacts",
					importSheet: "Import Excel",
					add: "Add Contact",
					export: "Export Contacts",
					delete: "Delete All Contacts",
				},
				table: {
					name: "Name",
					whatsapp: "WhatsApp",
					email: "Email",
					actions: "Actions",
				},
			},
			queueIntegrationModal: {
				title: {
					add: "Add Project",
					edit: "Edit Project",
				},
				form: {
					id: "ID",
					type: "Type",
					name: "Name",
					projectName: "Project Name",
					language: "Language",
					jsonContent: "JsonContent",
					urlN8N: "URL",
					typebotSlug: "Typebot - Slug",
					typebotExpires: "Conversation Expiry Time (in minutes)",
					typebotKeywordFinish: "Keyword to finish the ticket",
					typebotKeywordRestart: "Keyword to restart the flow",
					typebotRestartMessage: "Message on restarting the conversation",
					typebotUnknownMessage: "Invalid option message",
					typebotDelayMessage: "Delay (ms) between messages",
				},
				buttons: {
					okAdd: "Add",
					okEdit: "Save",
					cancel: "Cancel",
					test: "Test Bot",
				},
				messages: {
					testSuccess: "Integration tested successfully!",
					addSuccess: "Integration added successfully.",
					editSuccess: "Integration edited successfully.",
				},
			},
			sideMenu: {
				name: "Initial Side Menu",
				note: "If enabled, the side menu will start closed",
				options: {
					enabled: "Open",
					disabled: "Closed",
				},
			},
			promptModal: {
				form: {
					name: "Name",
					prompt: "Prompt",
					voice: "Voice",
					max_tokens: "Max Tokens in Response",
					temperature: "Temperature",
					apikey: "API Key",
					max_messages: "Max Messages in History",
					voiceKey: "Voice API Key",
					voiceRegion: "Voice Region",
				},
				success: "Prompt saved successfully!",
				title: {
					add: "Add Prompt",
					edit: "Edit Prompt",
				},
				buttons: {
					okAdd: "Add",
					okEdit: "Save",
					cancel: "Cancel",
				},
			},
			prompts: {
				title: "Prompts",
				table: {
					name: "Name",
					queue: "Department/Queue",
					max_tokens: "Max Tokens in Response",
					actions: "Actions",
				},
				confirmationModal: {
					deleteTitle: "Delete",
					deleteMessage: "Are you sure? This action cannot be reverted!",
				},
				buttons: {
					add: "Add Prompt",
				},
			},
			contactModal: {
				title: {
					add: "Add contact",
					edit: "Edit contact",
				},
				form: {
					mainInfo: "Contact details",
					extraInfo: "Additional information",
					name: "Name",
					number: "Whatsapp number",
					email: "Email",
					extraName: "Field name",
					extraValue: "Value",
					whatsapp: "Origin Connection",
				},
				buttons: {
					addExtraInfo: "Add information",
					okAdd: "Add",
					okEdit: "Save",
					cancel: "Cancel",
				},
				success: "Contact saved successfully.",
			},
			queueModal: {
				title: {
					add: "Add queue",
					edit: "Edit queue",
				},
				confirmationModal: {
					deleteTitle: "Delete",
				},
				form: {
					name: "Name",
					color: "Color",
					greetingMessage: "Greeting Message",
					complationMessage: "Completion Message",
					outOfHoursMessage: "Out of Hours Message",
					ratingMessage: "Rating Message",
					token: "Token",
					orderQueue: "Queue Order (Bot)",
					integrationId: "Integration",
				},
				buttons: {
					okAdd: "Add",
					okEdit: "Save",
					cancel: "Cancel",
					attach: "Attach File",
				},
			},
			userModal: {
				title: {
					add: "Add user",
					edit: "Edit user",
				},
				form: {
					name: "Name",
					email: "Email",
					password: "Password",
					profile: "Profile",
					whatsapp: "Default Connection",
					allTicket: "Queue-less Ticket [Invisible]",
					allTicketEnabled: "Enabled",
					allTicketDesabled: "Disabled",
				},
				buttons: {
					okAdd: "Add",
					okEdit: "Save",
					cancel: "Cancel",
				},
				success: "User saved successfully.",
			},
			scheduleModal: {
				title: {
					add: "New Schedule",
					edit: "Edit Schedule",
				},
				form: {
					body: "Message",
					contact: "Contact",
					sendAt: "Schedule Date",
					sentAt: "Sent Date",
				},
				buttons: {
					okAdd: "Add",
					okEdit: "Save",
					cancel: "Cancel",
				},
				success: "Schedule saved successfully.",
			},
			tagModal: {
				title: {
					add: "New Tag",
					edit: "Edit Tag",
				},
				form: {
					name: "Name",
					color: "Color",
				},
				buttons: {
					okAdd: "Add",
					okEdit: "Save",
					cancel: "Cancel",
				},
				success: "Tag saved successfully.",
			},
			chat: {
				noTicketMessage: "Select a ticket to start chatting.",
			},
			uploads: {
				titles: {
					titleUploadMsgDragDrop: "DRAG AND DROP FILES INTO THE FIELD BELOW",
					titleFileList: "File List",
				},
			},
			ticketsManager: {
				buttons: {
					newTicket: "New",
				},
			},
			ticketsQueueSelect: {
				placeholder: "Queues",
			},
			tickets: {
				toasts: {
					deleted: "The ticket you were on has been deleted.",
				},
				notification: {
					message: "Message from",
				},
				tabs: {
					open: { title: "Open" },
					closed: { title: "Resolved" },
					search: { title: "Search" },
				},
				search: {
					placeholder: "Search tickets and messages",
				},
				buttons: {
					showAll: "All",
				},
			},
			transferTicketModal: {
				title: "Transfer Ticket",
				fieldLabel: "Type to search for users",
				fieldQueueLabel: "Transfer to queue",
				fieldQueuePlaceholder: "Select a queue",
				noOptions: "No user found with this name",
				buttons: {
					ok: "Transfer",
					cancel: "Cancel",
				},
			},
			ticketsList: {
				pendingHeader: "Queue",
				assignedHeader: "Assigned",
				noTicketsTitle: "Nothing here!",
				noTicketsMessage: "No tickets found with this status or search term.",
				buttons: {
					accept: "Accept",
					closed: "Close",
					reopen: "Reopen",
				},
			},
			newTicketModal: {
				title: "Create Ticket",
				fieldLabel: "Type to search for a contact",
				add: "Add",
				buttons: {
					ok: "Save",
					cancel: "Cancel",
				},
			},
			mainDrawer: {
				listItems: {
					dashboard: "Dashboard",
					connections: "Connections",
					tickets: "Tickets",
					quickMessages: "Quick Messages",
					contacts: "Contacts",
					queues: "Queues & Chatbot",
					tags: "Tags",
					administration: "Administration",
					users: "Users",
					settings: "Settings",
					helps: "Help",
					messagesAPI: "API",
					schedules: "Schedules",
					campaigns: "Campaigns",
					annoucements: "Announcements",
					chats: "Internal Chat",
					financeiro: "Finance",
					files: "File List",
					prompts: "Open.Ai",
					queueIntegration: "Integrations",
				},
				appBar: {
					notRegister: "No notifications",
					user: {
						profile: "Profile",
						logout: "Logout",
					},
				},
			},
			queueIntegration: {
				title: "Integrations",
				table: {
					id: "ID",
					type: "Type",
					name: "Name",
					projectName: "Project Name",
					language: "Language",
					lastUpdate: "Last Update",
					actions: "Actions",
				},
				buttons: {
					add: "Add Project",
				},
				searchPlaceholder: "Search...",
				confirmationModal: {
					deleteTitle: "Delete",
					deleteMessage: "Are you sure? This action cannot be reverted and it will be removed from linked queues and connections.",
				},
			},
			files: {
				title: "File List",
				table: {
					name: "Name",
					contacts: "Contacts",
					actions: "Action",
				},
				toasts: {
					deleted: "List deleted successfully!",
					deletedAll: "All lists deleted successfully!",
				},
				buttons: {
					add: "Add",
					deleteAll: "Delete All",
				},
				confirmationModal: {
					deleteTitle: "Delete",
					deleteAllTitle: "Delete All",
					deleteMessage: "Are you sure you want to delete this list?",
					deleteAllMessage: "Are you sure you want to delete all lists?",
				},
			},
			messagesAPI: {
				title: "API",
				textMessage: {
					number: "Number",
					body: "Message",
					token: "Registered token",
				},
				mediaMessage: {
					number: "Number",
					body: "File Name",
					media: "File",
					token: "Registered token",
				},
			},
			notifications: {
				noTickets: "No notifications.",
			},
			quickMessages: {
				title: "Quick Messages",
				searchPlaceholder: "Search...",
				noAttachment: "No attachment",
				confirmationModal: {
					deleteTitle: "Delete",
					deleteMessage: "This action is irreversible! Do you want to proceed?",
				},
				buttons: {
					add: "Add",
					attach: "Attach File",
					cancel: "Cancel",
					edit: "Edit",
				},
				toasts: {
					success: "Shortcut added successfully!",
					deleted: "Shortcut removed successfully!",
				},
				dialog: {
					title: "Quick Message",
					shortcode: "Shortcut",
					message: "Response",
					save: "Save",
					cancel: "Cancel",
					geral: "Allow edit",
					add: "Add",
					edit: "Edit",
					visao: "Allow view",
				},
				table: {
					shortcode: "Shortcut",
					message: "Message",
					actions: "Actions",
					mediaName: "File Name",
					status: "Status",
				},
			},
			messageVariablesPicker: {
				label: "Available Variables",
				vars: {
					contactFirstName: "First Name",
					contactName: "Name",
					greeting: "Greeting",
					protocolNumber: "Protocol",
					date: "Date",
					hour: "Hour",
				},
			},
			contactLists: {
				title: "Contact Lists",
				table: {
					name: "Name",
					contacts: "Contacts",
					actions: "Actions",
				},
				buttons: {
					add: "New List",
				},
				dialog: {
					name: "Name",
					company: "Company",
					okEdit: "Edit",
					okAdd: "Add",
					add: "Add",
					edit: "Edit",
					cancel: "Cancel",
				},
				confirmationModal: {
					deleteTitle: "Delete",
					deleteMessage: "This action cannot be reverted.",
				},
				toasts: {
					deleted: "Record deleted",
				},
			},
			contactListItems: {
				title: "Contacts",
				searchPlaceholder: "Search",
				buttons: {
					add: "New",
					lists: "Lists",
					import: "Import",
				},
				dialog: {
					name: "Name",
					number: "Number",
					whatsapp: "WhatsApp",
					email: "Email",
					okEdit: "Edit",
					okAdd: "Add",
					add: "Add",
					edit: "Edit",
					cancel: "Cancel",
				},
				table: {
					name: "Name",
					number: "Number",
					whatsapp: "WhatsApp",
					email: "Email",
					actions: "Actions",
				},
				confirmationModal: {
					deleteTitle: "Delete",
					deleteMessage: "This action cannot be reverted.",
					importMessage: "Do you want to import the contacts from this sheet?",
					importTitle: "Import",
				},
				toasts: {
					deleted: "Record deleted",
				},
			},
			campaigns: {
				title: "Campaigns",
				searchPlaceholder: "Search",
				buttons: {
					add: "New Campaign",
					contactLists: "Contact Lists",
				},
				table: {
					name: "Name",
					whatsapp: "Connection",
					contactList: "Contact List",
					status: "Status",
					scheduledAt: "Scheduled",
					completedAt: "Completed",
					confirmation: "Confirmation",
					actions: "Actions",
				},
				dialog: {
					new: "New Campaign",
					update: "Edit Campaign",
					readonly: "Read-only",
					form: {
						name: "Name",
						message1: "Message 1",
						message2: "Message 2",
						message3: "Message 3",
						message4: "Message 4",
						message5: "Message 5",
						confirmationMessage1: "Confirmation Message 1",
						confirmationMessage2: "Confirmation Message 2",
						confirmationMessage3: "Confirmation Message 3",
						confirmationMessage4: "Confirmation Message 4",
						confirmationMessage5: "Confirmation Message 5",
						messagePlaceholder: "Message content",
						whatsapp: "Connection",
						status: "Status",
						scheduledAt: "Scheduled",
						confirmation: "Confirmation",
						contactList: "Contact List",
						tagList: "Tag List",
						fileList: "File List",
					},
					buttons: {
						add: "Add",
						edit: "Update",
						okadd: "Ok",
						cancel: "Cancel Shots",
						restart: "Restart Shots",
						close: "Close",
						attach: "Attach File",
					},
				},
				confirmationModal: {
					deleteTitle: "Delete",
					deleteMessage: "This action cannot be reverted.",
				},
				toasts: {
					success: "Operation completed successfully",
					cancel: "Campaign canceled",
					restart: "Campaign restarted",
					deleted: "Record deleted",
				},
			},
			announcements: {
				active: "Active",
				inactive: "Inactive",
				title: "Announcements",
				searchPlaceholder: "Search",
				buttons: {
					add: "New Announcement",
					contactLists: "Contact Lists",
				},
				table: {
					priority: "Priority",
					title: "Title",
					text: "Text",
					mediaName: "File",
					status: "Status",
					actions: "Actions",
				},
				dialog: {
					edit: "Edit Announcement",
					add: "New Announcement",
					update: "Edit Announcement",
					readonly: "Read-only",
					form: {
						priority: "Priority",
						title: "Title",
						text: "Text",
						mediaPath: "File",
						status: "Status",
					},
					buttons: {
						add: "Add",
						edit: "Update",
						okadd: "Ok",
						cancel: "Cancel",
						close: "Close",
						attach: "Attach File",
					},
				},
				confirmationModal: {
					deleteTitle: "Delete",
					deleteMessage: "This action cannot be reverted.",
				},
				toasts: {
					success: "Operation completed successfully",
					deleted: "Record deleted",
				},
			},
			campaignsConfig: {
				title: "Campaign Settings",
			},
			queues: {
				title: "Queues & Chatbot",
				table: {
					id: "ID",
					name: "Name",
					color: "Color",
					greeting: "Greeting message",
					actions: "Actions",
					orderQueue: "Queue order (bot)",
				},
				buttons: {
					add: "Add queue",
				},
				confirmationModal: {
					deleteTitle: "Delete",
					deleteMessage: "Are you sure? This action cannot be reverted! Tickets in this queue will still exist, but will not have any queues assigned.",
				},
			},
			queueSelect: {
				inputLabel: "Queues",
			},
			users: {
				title: "Users",
				table: {
					id: "ID",
					name: "Name",
					email: "Email",
					profile: "Profile",
					actions: "Actions",
				},
				buttons: {
					add: "Add user",
				},
				toasts: {
					deleted: "User deleted successfully.",
				},
				confirmationModal: {
					deleteTitle: "Delete",
					deleteMessage: "All user data will be lost. Users' open tickets will be moved to queue.",
				},
			},
			helps: {
				title: "Help Center",
			},
			schedules: {
				title: "Schedules",
				confirmationModal: {
					deleteTitle: "Are you sure you want to delete this Schedule?",
					deleteMessage: "This action cannot be reverted.",
				},
				table: {
					contact: "Contact",
					body: "Message",
					sendAt: "Schedule Date",
					sentAt: "Sent Date",
					status: "Status",
					actions: "Actions",
				},
				buttons: {
					add: "New Schedule",
				},
				toasts: {
					deleted: "Schedule deleted successfully.",
				},
			},
			tags: {
				title: "Tags",
				confirmationModal: {
					deleteTitle: "Are you sure you want to delete this Tag?",
					deleteMessage: "This action cannot be reverted.",
					deleteAllMessage: "Are you sure you want to delete all Tags?",
					deleteAllTitle: "Delete All",
				},
				table: {
					name: "Name",
					color: "Color",
					tickets: "Tagged Records",
					actions: "Actions",
				},
				buttons: {
					add: "New Tag",
					deleteAll: "Delete All",
				},
				toasts: {
					deletedAll: "All Tags deleted successfully!",
					deleted: "Tag deleted successfully.",
				},
			},
			settings: {
				success: "Settings saved successfully.",
				title: "Settings",
				settings: {
					userCreation: {
						name: "User creation",
						options: {
							enabled: "Enabled",
							disabled: "Disabled",
						},
					},
				},
			},
			messagesList: {
				header: {
					assignedTo: "Assigned to:",
					buttons: {
						return: "Return",
						resolve: "Resolve",
						reopen: "Reopen",
						accept: "Accept",
					},
				},
			},
			messagesInput: {
				placeholderOpen: "Type a message",
				placeholderClosed: "Reopen or accept this ticket to send a message.",
				signMessage: "Sign",
			},
			contactDrawer: {
				header: "Contact details",
				buttons: {
					edit: "Edit contact",
				},
				extraInfo: "Other information",
			},
			fileModal: {
				title: {
					add: "Add file list",
					edit: "Edit file list",
				},
				buttons: {
					okAdd: "Save",
					okEdit: "Edit",
					cancel: "Cancel",
					fileOptions: "Add file",
				},
				form: {
					name: "File list name",
					message: "File list details",
					fileOptions: "File list",
					extraName: "Message to send with file",
					extraValue: "Option value",
				},
				success: "File list saved successfully!",
			},
			ticketOptionsMenu: {
				schedule: "Schedule",
				delete: "Delete",
				transfer: "Transfer",
				registerAppointment: "Contact Notes",
				appointmentsModal: {
					title: "Contact Notes",
					textarea: "Note",
					placeholder: "Enter the information you want to record here",
				},
				confirmationModal: {
					title: "Delete ticket",
					titleFrom: "from contact ",
					message: "Attention! All related messages will be lost.",
				},
				buttons: {
					delete: "Delete",
					cancel: "Cancel",
				},
			},
			confirmationModal: {
				buttons: {
					confirm: "Ok",
					cancel: "Cancel",
				},
			},
			messageOptionsMenu: {
				delete: "Delete",
				reply: "Reply",
				confirmationModal: {
					title: "Delete message?",
					message: "This action cannot be reverted.",
				},
			},
			backendErrors: {
				ERR_NO_OTHER_WHATSAPP: "There must be at least one default WhatsApp connection.",
				ERR_NO_DEF_WAPP_FOUND: "No default WhatsApp found. Check connections page.",
				ERR_WAPP_NOT_INITIALIZED: "This WhatsApp session is not initialized. Check connections page.",
				ERR_WAPP_CHECK_CONTACT: "Could not check WhatsApp contact. Check connections page.",
				ERR_WAPP_INVALID_CONTACT: "This is not a valid WhatsApp number.",
				ERR_WAPP_DOWNLOAD_MEDIA: "Could not download media from WhatsApp. Check connections page.",
				ERR_INVALID_CREDENTIALS: "Authentication error. Please try again.",
				ERR_SENDING_WAPP_MSG: "Error sending WhatsApp message. Check connections page.",
				ERR_DELETE_WAPP_MSG: "Couldn't delete message from WhatsApp.",
				ERR_OTHER_OPEN_TICKET: "There's already an open ticket for this contact.",
				ERR_SESSION_EXPIRED: "Session expired. Please login.",
				ERR_USER_CREATION_DISABLED: "User creation was disabled by administrator.",
				ERR_NO_PERMISSION: "You don't have permission to access this resource.",
				ERR_DUPLICATED_CONTACT: "A contact with this number already exists.",
				ERR_NO_SETTING_FOUND: "No setting found with this ID.",
				ERR_NO_CONTACT_FOUND: "No contact found with this ID.",
				ERR_NO_TICKET_FOUND: "No ticket found with this ID.",
				ERR_NO_USER_FOUND: "No user found with this ID.",
				ERR_NO_WAPP_FOUND: "No WhatsApp found with this ID.",
				ERR_CREATING_MESSAGE: "Error while creating message on database.",
				ERR_CREATING_TICKET: "Error while creating ticket on database.",
				ERR_FETCH_WAPP_MSG: "Error fetching the message in WhatsApp, maybe it is too old.",
				ERR_QUEUE_COLOR_ALREADY_EXISTS: "This color is already in use, pick another one.",
				ERR_WAPP_GREETING_REQUIRED: "Greeting message is required if there is more than one queue.",
			},
		},
	},
};

export { messages };

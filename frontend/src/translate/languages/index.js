import { messages as portugueseMessages } from "./pt";
import { messages as englishMessages } from "./en";
import { messages as spanishMessages } from "./es";
import { messages as indonesianMessages } from "./id"; // Tambahkan ini

const messages = {
	...portugueseMessages,
	...englishMessages,
	...spanishMessages,
	...indonesianMessages, // Tambahkan ini
};

export { messages };

import { HOST } from "../config";
import { Genre } from "../types/geners";

type Api = {
	getAllGenre: () => Promise<Genre[]>;
	openSelectBookPage: (genreName: string) => Promise<string | never>;
};

const api: Api = {
	getAllGenre: async () => {
		const response = await fetch(`${HOST}api/genre`)
			.then((res) => res.json())
			.catch((e) => {
				throw e;
			});

		return response.data.map((name: string) => ({
			name,
			disabled: false,
		}));
	},

	openSelectBookPage: async (genreName) => {
		const response = await fetch(`${HOST}api/book`, {
			method: "POST",
			headers: {
				"content-type": "application/json;charset=UTF-8",
			},
			body: JSON.stringify({ genre: genreName }),
		})
			.then((res) => res.json())
			.catch((e) => {
				throw e;
			});

		if (response.message) throw new Error(response.message);
		return response.data;
	},
};

export default api;

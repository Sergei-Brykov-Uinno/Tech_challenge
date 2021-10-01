import { useEffect, useState } from "react";
import api from "../api/index";
import { Genre } from "../types/geners";

export const useFetchGenres = (): [
	Genre[],
	boolean,
	string,
	(message: string) => void
] => {
	const [loading, setLoading] = useState<boolean>(true);
	const [genres, setGenres] = useState<Genre[]>([]);
	const [error, setError] = useState<string>("");
	useEffect(() => {
		async function init() {
			try {
				const genresData = await api.getAllGenre();
				setGenres(genresData);
			} catch (error: any) {
				setError(error.message as string);
			} finally {
				setLoading(false);
			}
		}

		init();
	}, []);
	return [genres, loading, error, setError];
};

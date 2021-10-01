import "./components.css";
import React from "react";
import { useFetchGenres } from "../hooks/useFetchGenres";
import { GenresForm } from "./GenresForm";
import { ErrorComponent } from "./ErrorComponent";
import { FormLoader } from "./FormLoader";

export const Main: React.FC = () => {
	const [genres, loading, error, setError] = useFetchGenres();

	if (loading) return <FormLoader />;

	if (error) return <ErrorComponent error={error} />;

	return (
		<div className="form-wrapper">
			{!!genres.length && <GenresForm genres={genres} setError={setError} />}
			{!genres.length && <span>Sorry genres not found</span>}
		</div>
	);
};

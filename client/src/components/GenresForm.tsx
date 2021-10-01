import "./components.css";
import React, { SyntheticEvent, useCallback, useState } from "react";
import { MainLoader } from "./Loader";
import { Genre } from "../types/geners";
import { GenreItem } from "./GenreItem";
import clx from "../helpers/className";
import { Button } from "./Button";
import api from "../api";

type GenresFormProps = {
	genres: Genre[];
	setError: (errorMessage: string) => void;
};

const useGenresFormState = (setError: (errorMessage: string) => void) => {
	const [activeGenre, setActiveGenre] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [successLink, setSuccessLink] = useState<string | null>(null);

	// const [loading, setLoading] = useState<boolean>(false);

	const onSelectHandler = useCallback((genreName: string) => {
		setActiveGenre(genreName);
	}, []);

	const onSubmit = useCallback(
		async (e: SyntheticEvent) => {
			e.preventDefault();
			if (!activeGenre || loading) return;
			try {
				setLoading(true);
				const link = await api.openSelectBookPage(activeGenre);
				setSuccessLink(link);
			} catch (error: any) {
				setError(error.message as string);
			} finally {
				setLoading(false);
			}
		},
		[activeGenre, loading, setError]
	);

	return {
		activeGenre,
		loading,
		onSelectHandler,
		onSubmit,
		disabled: loading || !Boolean(activeGenre),
		showForm: !successLink && !loading,
		showSuccess: !loading && successLink,
		successLink,
	};
};

export const GenresForm: React.FC<GenresFormProps> = ({ genres, setError }) => {
	const {
		activeGenre,
		loading,
		onSelectHandler,
		onSubmit,
		disabled,
		showForm,
		showSuccess,
		successLink,
	} = useGenresFormState(setError);

	return (
		<form className="genres-form" onSubmit={onSubmit}>
			{loading && <MainLoader />}
			{showForm && (
				<>
					<div className={clx("form-header", "flex-center")}>
						Please select a genre press the submit button and wait for the
						opening of Amazon
					</div>
					{genres.map((genre, index) => (
						<GenreItem
							key={index}
							{...genre}
							active={activeGenre === genre.name}
							onClick={onSelectHandler}
						/>
					))}
					<div className={clx("flex-center", "button-wrapper")}>
						<Button disabled={disabled}>Submit</Button>
					</div>
				</>
			)}

			{showSuccess && (
				<div className="success">
					Your book is successfully placed in the basket. Check the browser
					tabs!
					<div>
						<a href={successLink!}>{successLink}</a>
					</div>
				</div>
			)}
		</form>
	);
};

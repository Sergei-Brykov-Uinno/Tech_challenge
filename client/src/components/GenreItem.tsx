import "./components.css";
import React, { useCallback } from "react";
import { Genre } from "../types/geners";
import clx from "../helpers/className";

type GenreItemProps = Genre & {
	active: boolean;
	onClick: (name: string) => void;
};

const useGenreItem = ({ name, disabled, onClick, active }: GenreItemProps) => {
	const onSelectHandler = useCallback(() => {
		!disabled && onClick(name);
	}, [disabled, onClick, name]);

	return {
		name,
		onSelectHandler,
		classes: [disabled && "disabled-genre-item", active && "active-genre-item"],
	};
};

export const GenreItem: React.FC<GenreItemProps> = (props) => {
	const { name, onSelectHandler, classes } = useGenreItem(props);

	return (
		<div className={clx("genre-item", ...classes)} onClick={onSelectHandler}>
			{name}
		</div>
	);
};

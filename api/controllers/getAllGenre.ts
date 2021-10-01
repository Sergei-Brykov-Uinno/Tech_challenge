import { Request, Response, NextFunction } from "express";
import { getAllGenreFromPage } from "../puppetter/getAllGenreFromPage";

const getAllGenre = async (req: Request, res: Response, next: NextFunction) => {
	const genreArray = await getAllGenreFromPage();
	res.json({ data: genreArray });
};

export { getAllGenre };

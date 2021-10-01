import { Request, Response, NextFunction } from "express";
import { MyError } from "../helpers/myError";
import { findBookByGenre } from "../puppetter/findBookByGenre";
import { openNewTabInBrowser } from "../puppetter/openNewTabInBrowser";

const openAmazonShoppingPage = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { genre } = req.body;
		const bookName = await findBookByGenre(genre);
		const link = await openNewTabInBrowser(bookName);
		res.json({ data: link });
	} catch (error) {
		next(error);
	}
};

export { openAmazonShoppingPage };

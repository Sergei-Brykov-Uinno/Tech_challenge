import { Request, Response, NextFunction } from "express";
import { MyError } from "../helpers/myError";

const errorHandler = (
	error: any,
	_: Request,
	res: Response,
	next: NextFunction
) => {
	if (error instanceof MyError) {
		res.status(400).json({ message: error.message });
	}

	res.status(500).json({ message: "Sorry, something happened to the server!" });
};

export { errorHandler };

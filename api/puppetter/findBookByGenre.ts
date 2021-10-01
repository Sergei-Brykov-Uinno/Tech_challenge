import { MyError } from "../helpers/myError";
import * as puppeteer from "puppeteer";
import { BEST_BOOKS_PAGE, RGX } from "./config";

const { PAGE_LINK, GENRE_TITLE_SELECTOR, BOOK_TITLE_SELECTOR } =
	BEST_BOOKS_PAGE;

const findBookByGenre: (genre: string) => Promise<string> = async (genre) => {
	try {
		const browser = await puppeteer.launch({ headless: true });

		const genrePage = await browser.newPage();
		await genrePage.goto(PAGE_LINK);
		const error = await genrePage.evaluate(
			(genre, GENRE_TITLE_SELECTOR) => {
				let genreElement;

				document.querySelectorAll(GENRE_TITLE_SELECTOR).forEach((element) => {
					if (element.innerHTML.trim() === genre) {
						genreElement = element;
					}
				});

				if (!genreElement) {
					return "This genre not found, try another";
				}

				genreElement.click();
			},
			genre,
			GENRE_TITLE_SELECTOR
		);

		if (error) {
			throw new MyError(error);
		}

		await genrePage.waitForNavigation();

		let [bookName, errorMsg] = await genrePage.evaluate(
			(BOOK_TITLE_SELECTOR) => {
				const bookTittleElement = document.querySelector(BOOK_TITLE_SELECTOR);
				if (!bookTittleElement) {
					return ["", "This book not found, try another with another genre"];
				}
				return [bookTittleElement.innerHTML, null];
			},
			BOOK_TITLE_SELECTOR
		);

		if (errorMsg) {
			throw new MyError(errorMsg);
		}

		return bookName.replace(RGX, "");
	} catch (error) {
		throw error;
	}
};

export { findBookByGenre };

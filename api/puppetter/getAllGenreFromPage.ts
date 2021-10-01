import * as puppeteer from "puppeteer";
import { BEST_BOOKS_PAGE } from "./config";

const { PAGE_LINK, GENRE_TITLE_SELECTOR } = BEST_BOOKS_PAGE;

const getAllGenreFromPage = async () => {
	try {
		const browser = await puppeteer.launch({ headless: true });

		const genrePage = await browser.newPage();
		await genrePage.goto(PAGE_LINK);

		const genreArray = await genrePage.evaluate((GENRE_TITLE_SELECTOR) => {
			const genreArray = [];
			document
				.querySelectorAll(GENRE_TITLE_SELECTOR)
				.forEach((element) => genreArray.push(element.innerHTML.trim()));
			return genreArray;
		}, GENRE_TITLE_SELECTOR as string);

		browser.close();

		return genreArray;
	} catch (error) {
		throw error;
	}
};

export { getAllGenreFromPage };

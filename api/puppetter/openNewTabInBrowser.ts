import { MyError } from "../helpers/myError";
import * as puppeteer from "puppeteer";
import { buildAmazonSearchLink, AMAZON_PAGE } from "./config";

const {
	BOOK_TITLES_SELECTOR,
	ADD_CARD_BUTTON_SELECTOR,
	FORMAT_BUTTONS_SELECTOR,
} = AMAZON_PAGE;

const openNewTabInBrowser = async (bookName) => {
	try {
		const browser = await puppeteer.launch({
			headless: false,
			defaultViewport: null,
		});

		const amazonPage = await browser.newPage();
		await amazonPage.setViewport({ width: 1500, height: 1000 });
		await amazonPage.goto(buildAmazonSearchLink(bookName));

		await amazonPage.evaluate(
			(bookName: string, BOOK_TITLES_SELECTOR: string) => {
				const rgx = /[^a-zA-Z ]/g;

				const elementsArray =
					document.querySelectorAll<HTMLElement>(BOOK_TITLES_SELECTOR);

				for (const element of elementsArray) {
					const bookTitle = element.innerHTML.replace(rgx, "");
					if (bookTitle.includes(bookName)) {
						elementsArray[0]?.click();
						return;
					}
				}
				throw new MyError("Sorry best book of your genre not found on amazon");
			},
			bookName as string,
			BOOK_TITLES_SELECTOR as string
		);
		await amazonPage.waitForNavigation();
		const success = await amazonPage.evaluate(
			(ADD_CARD_BUTTON_SELECTOR: string, FORMAT_BUTTONS_SELECTOR: string) => {
				const element = document.querySelector<HTMLElement>(
					ADD_CARD_BUTTON_SELECTOR
				);
				if (element) {
					element.click();
					return true;
				}
				document
					.querySelectorAll<HTMLLinkElement>(FORMAT_BUTTONS_SELECTOR)
					.forEach((element) => {
						if (element.firstElementChild?.innerHTML === "Hardcover") {
							element.click();
						}
					});
			},
			ADD_CARD_BUTTON_SELECTOR as string,
			FORMAT_BUTTONS_SELECTOR as string
		);
		await amazonPage.waitForNavigation();
		if (!success) {
			await amazonPage.evaluate(async (ADD_CARD_BUTTON_SELECTOR) => {
				const element = document.querySelector<HTMLElement>(
					ADD_CARD_BUTTON_SELECTOR
				);
				if (!element) {
					alert(
						"Sorry this book is not in hardcover, you can buy in another... check it!"
					);
					return;
				}
				await element.click();
			}, ADD_CARD_BUTTON_SELECTOR as string);
		}

		return amazonPage.url();
	} catch (error) {
		throw error;
	}
};

export { openNewTabInBrowser };

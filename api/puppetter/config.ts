const BEST_BOOKS_PAGE = {
	PAGE_LINK: "https://www.goodreads.com/choiceawards/best-books-2020",
	GENRE_TITLE_SELECTOR: ".category__copy",
	BOOK_TITLE_SELECTOR: "a.winningTitle.choice.gcaBookTitle",
};
const AMAZON_PAGE = {
	BOOK_TITLES_SELECTOR: ".a-size-medium.a-color-base.a-text-normal",
	ADD_CARD_BUTTON_SELECTOR: "#add-to-cart-button",
	FORMAT_BUTTONS_SELECTOR: ".a-unordered-list .a-button-text",
};
const RGX = /[^a-zA-Z ]/g;

const buildAmazonSearchLink = (bookName) => {
	return `https://www.amazon.com/s?k=${bookName}&i=stripbooks-intl-ship&ref=nb_sb_noss_2`;
};

export { BEST_BOOKS_PAGE, RGX, buildAmazonSearchLink, AMAZON_PAGE };

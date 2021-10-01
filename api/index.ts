import { getAllGenre } from "./controllers/getAllGenre";
import { openAmazonShoppingPage } from "./controllers/openAmazonShoppingPage";
import * as express from "express";
import * as cors from "cors";
import { errorHandler } from "./error/errorHandler";

const app = express();
const port = 5000;

app.use(cors());

app.get("/api/genre", getAllGenre);
app.use(express.json());
app.post("/api/book", openAmazonShoppingPage);

app.use(errorHandler);

app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});

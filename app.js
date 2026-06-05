import express from "express";
import dotenv from "dotenv";
import router from "./routes/Router";

dotenv.config();

const app = new express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use("api", router);

app.listen(PORT, () => console.log(`Server listening on port: ${port}`));

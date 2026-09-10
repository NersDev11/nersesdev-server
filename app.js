import "dotenv/config";
import express from "express";
import router from "./routes/Router.js";
import cors from "cors";

const app = express();

const port = process.env.PORT || 3001;

app.set("trust proxy", 1);

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use("/api", router);

app.listen(port, () => console.log(`Server listening on port: ${port}`));

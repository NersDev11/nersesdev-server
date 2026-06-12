import "dotenv/config";
import express from "express";
import router from "./routes/Router.js";
import cors from "cors";

const app = new express();

const port = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api", router);

app.listen(port, () => console.log(`Server listening on port: ${port}`));

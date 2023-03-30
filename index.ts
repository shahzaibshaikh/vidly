import express from "express";
import genresRouter from "./routes/genres";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/genres", genresRouter);

dbConnect();

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

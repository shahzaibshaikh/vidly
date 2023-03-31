import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect";
import genresRouter from "./routes/genres";
import customerRouter from "./routes/customers";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/genres", genresRouter);
app.use("/api/customers", customerRouter);

dbConnect();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

import express from "express";
import todoRouter from "./routes/todo.js";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT ?? 3000;
dotenv.config()
app.disable("x-powered-by");
app.use(express.json());

app.use("/api",todoRouter)

app.listen(port, () => {
    console.log(`The server is listening in the http://localhost:${port}`);
})
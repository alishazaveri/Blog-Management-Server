import express from "express";
import { config } from "dotenv";
import restService from "./routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "https://blog-mg.netlify.app",
    credentials: true,
  })
);

app.use("/api", restService);

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});

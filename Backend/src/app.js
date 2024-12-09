import express from "express";
import productRouter from "./routes/product.js";
import authRouter from "./routes/auth.js";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import session from "express-session";
import { initData } from "./scripts/init.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.get("/", (req, res) => {
  res.send("Hello, Express! how are you");
});

app.use("/api", authRouter)
app.use("/api", productRouter);

const port = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGODB_LOCAL;
mongoose
  .connect(MONGO_URL)
  .then(async () => {
    console.log("connected to db");
    await initData() //Gọi hàm khởi tạo dữ liệu 
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(`error in connect db : ${err}`));

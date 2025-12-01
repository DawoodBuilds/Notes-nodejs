import express, { json } from "express";
import ConnectDb from "./Config/db.js";
import cors from "cors";
import authRouter from "./Routes/AuthRouter.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import openairouter from "./Routes/OpenAiRouter.js";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: "Too many requests, try again later.",
});

const app = express();
const port = 8000;

ConnectDb();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(helmet());
app.use(cookieParser());
app.use(json({ limit: "1mb" }));

app.use(limiter);

app.use((req, res, next) => {
  if (
    req.method === "POST" &&
    req.headers["content-type"] &&
    !req.headers["content-type"].includes("application/json")
  ) {
    return res.status(400).json({ error: "Invalid content type" });
  }
  next();
});

app.use("/api", authRouter);
app.use("/api", openairouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

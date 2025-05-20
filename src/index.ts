import bodyParser from "body-parser";
import express from "express";

import cors from "cors";
import * as dotenv from "dotenv";
import chatRouter from "./routes/chat.route";
import rateLimit from "express-rate-limit";
import connectDB from "./database";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

connectDB();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 15,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", limiter);

app.use(bodyParser.json());

app.use(cors({
  origin: "*", // or specify origin: "http://localhost:5173"
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // '*' is not allowed here
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// app.use(options);

app.use("/api/chat", chatRouter);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});

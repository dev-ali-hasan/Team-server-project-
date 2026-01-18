import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/routes/api.js";

const app = express();

dotenv.config();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Mongoose connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.toString());
  });

app.use("/", router);

app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
});

export default app;

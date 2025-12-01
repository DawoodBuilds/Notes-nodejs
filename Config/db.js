import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function ConnectDb() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Connected!"))
    .catch((e) => console.log(`error: ${e}`));
}

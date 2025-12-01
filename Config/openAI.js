import { OpenAI } from "openai/client.js";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  // apiKey: process.env.api_key,
});
export default openai;

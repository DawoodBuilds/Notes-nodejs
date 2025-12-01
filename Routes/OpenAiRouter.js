import { Router } from "express";
import Generate from "../Controllers/Generate.js";

const openairouter = Router();
openairouter.post("/generate", Generate);

export default openairouter;

import express from "express";
import { getMediaControllers } from "./controllers/getMediaController";
const app = express();
const PORT = process.env.port || 5000;

app.get("/medias", getMediaControllers);

app.listen(PORT, () => {
    console.log(`Server started at port : ${PORT}`)
})
import { app } from "./app.js";
import connectDB from "./DB/index.js";
import dotenv from "dotenv/config";

connectDB().then(() => {
    app.on("error", (err) => {
        console.log("Server Error ", err)
        throw new Error(err);
    })
    app.listen(process.env.PORT || 800, () => {
        console.log("Server is Started on port", process.env.PORT);
    })
})
.catch((err) => console.log(err));

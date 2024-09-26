import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import { accessSync } from "fs"
import mongoose from "mongoose"

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
    console.log("Connected to db")
}).catch((e) => {
    console.log("Error from connection of App to DB: " + e)
})

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", async (req: Request, res: Response) => {
    res.json({ message: "Hello" })
})

app.listen(7000, () => {
    console.log(`Sever started on http://localhost:7000`)
})
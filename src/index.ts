import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import { v2 as cloudinary } from "cloudinary"
import mongoose from "mongoose"
import myUserRoute from "./routes/MyUserRoute"
import myRestaurantRoute from "./routes/MyRestaurantRoute"
import restaurantRoute from "./routes/RestaurantRoute"
import orderRoute from "./routes/OrderRoute"
import bodyParser = require("body-parser")
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
    console.log("Connected to db")
}).catch((e) => {
    console.log("Error from connection of App to DB: " + e)
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
const app = express()
app.use("/api/order/checkout/webhook", bodyParser.raw({ type: "*/*" }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())



app.get("/health", async (req: Request, res: Response) => {
    res.send({ message: "health OK!" })
})
app.use("/api/my/user", myUserRoute)
app.use("/api/my/restaurant", myRestaurantRoute)
app.use("/api/restaurant", restaurantRoute)
app.use("/api/order", orderRoute)

app.listen(7000, () => {

})
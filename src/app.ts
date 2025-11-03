import express from "express"
import cors from "cors"
import { connectDb } from "./config/db.js"
import dotenv from "dotenv";
import healthroute from "./routes/health.routes.js";
dotenv.config();

const app = express()

connectDb()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.use('/api/v1/healthcheck',healthroute)

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
    methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"]
}))

export default app
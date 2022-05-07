const express = require("express")
const http = require("http")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const productsRouter = require("./routes/productsRouter")
const cartRouter = require("./routes/cartRouter")
const dashesRouter = require("./routes/dashesRouter")
const testsRouter = require("./routes/testsRouter")
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(cors({
    credentials: true,
    methods: ["POST", "GET", "PATCH", "DELETE"],
    origin: [process.env.CLIENT_URL],
    allowedHeaders: ['Content-Type','Authorization', 'contenttype'],
    exposedHeaders: []
}))

app.use("/products", productsRouter)
app.use("/cart", cartRouter)
app.use("/dashes", dashesRouter)
app.use("/tests", testsRouter)

app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)

        server.listen(process.env.PORT, () => {
            console.log(`Server started on PORT = ${process.env.PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()

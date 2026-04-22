const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const client = require('./config/db')
const userRouter = require('./routes/userRoutes')
const transactionRouter = require('./routes/transcationsRoutes')
const adminRouter = require('./routes/adminRoutes')

dotenv.config()
const app = express()

//Middleware 
app.use(express.json())
app.use(express.urlencoded())
app.use(cors({ origin : '*'}))

const port = process.env.PORT || 8080;

//Routes
app.use('/api/users',userRouter)
app.use('/api/transactions',transactionRouter)
app.use('/api/admin',adminRouter)

const startServer = async()=>{
    try {

        await client.connect()
        console.log("Connected DB")

        app.listen(port,()=>{
            console.log(`Server is running on port ${port}`)
        })

    } catch (error) {
        console.log(error)
    }
}

startServer()

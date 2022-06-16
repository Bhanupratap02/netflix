const express = require('express')
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users")
const movieRoute = require("./routes/movies")
const listRoute = require("./routes/lists")
const port = 8000
dotenv.config()
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("mongodb connected"))
.catch((error)=>console.log(error));

app.use(express.json())


app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/movies",movieRoute)
app.use("/api/lists", listRoute);

app.listen(port, () => console.log(`Server is running
on port  ${port}!`))


// MONGO_URL = mongodb://localhost:27017/netflix
// SECRET_KEY=sachin0211
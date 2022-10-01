const express = require('express')
const app = express()
const db_connect = require('./database/db_connect')

require('dotenv').config()

app.use(express.json());

//Connection with DB
db_connect()

//ALL ROUTES
app.use("/api/branch",require("./Routes/branch"))
app.use("/api/teacher",require("./Routes/teacher"))
app.use("/api/subject",require("./Routes/subject"))
app.use("/api/auth/signup",require("./Routes/signup"))
app.use("/api/timetable",require("./Routes/timetable"))







//SERVER CONFIG
app.get("/",(req,res)=>{
    res.send("Hello");
})

app.listen(process.env.PORT || 3000,()=>{
    console.log(`Backend Server is Up and Running at PORT${process.env.PORT || 3000}`);
})
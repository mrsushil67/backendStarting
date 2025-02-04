const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("hello world server")
})
app.use('/user',userRouter);

module.exports = app;
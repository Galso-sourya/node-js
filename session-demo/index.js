const express = require('express')
const app = express()
const port = 3000
const session=require('express-session')
const sessionConfig={
secret:'weneedagoodsecret',//this creates the id of data
resave:false,
saveUninitialized:true,
}
//to initialize session
app.use(session(sessionConfig))
app.get("/",(req,res)=>{
    res.send("home route")
})
//how to add
app.get("/setuser",(req,res)=>{
    const {username}=req.query
    req.session.username=username
    res.send("successfully stored");
    
    //localhost:3000/setuser?username=namn
})
//how to acce3ss the data
app.get("/salutation",(req,res)=>{
    const {username}=req.session
    res.send(`hello ${username}`)
})
app.listen(port, () => console.log(`Example app listening at http://localhost:3000`))
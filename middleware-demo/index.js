const express = require('express')
const app = express()
const port = 3000
app.use((req,res,next)=>{
    console.log("MY FIRST MIDDLEWARE".red)
    next()//middleware function contains next
})
app.use((req,res,next)=>{
    console.log("MY SECOND MIDDLEWARE".red)
    req.username="naman"
    next()
})
app.get("/show",(req,res)=>{
    const {username}=req //destructerization
    res.send(`response send successfully ${username}`)
})
const verify=(req,res,next)=>{
    const {password}=req.query
    if(password==="12345"){
        return next() //localhost:3000/secret?password=12345
    }
    res.send("invalid") //localhost:3000/secret
}
app.get("/secret",verify,(req,res)=>{ //can add more by verify like verify,a,b,...............
    res.send("secret..........")
})
app.listen(port, () => console.log(`Example app listening at http://localhost:3000`))
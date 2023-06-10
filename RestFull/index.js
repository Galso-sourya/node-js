const express = require('express')
const app = express()
const path=require("path")
const port = 3000
const {v4:uuid}=require('uuid')
const methodOverride=require("method-override")
app.set("view engine","ejs")
//join is a method
app.set("views",path.join(__dirname,"views"))
//for post method
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
//as we do not have database, we are using array
const comments=[
    {id:uuid(),user:"kartik",text:"dnjdnd"},
    {id:uuid(),user:"ganesh",text:"cjdncjdnc"},
]
//list all the comments
app.get("/comments",(req,res)=>{
    res.render("index",{comments})
})
//display a form  to add comments
app.get("/comments/new",(req,res)=>{
    res.render("new")
})
//create a new comment
app.post("/comments",(req,res)=>{
    //destructurization
    const {user,text}=req.body
    comments.push({id:uuid(),user,text})
    res.redirect("/comments")
    //once server is closed,new comments will not be stored, it will be deleted
})
//show one particular comment
app.get("/comments/:commentid",(req,res)=>{
    const {commentid}=req.params
    const comment=comments.find((comment)=>comment.id===commentid)
    res.render("show",{comment})
})
//get edit form for updating values
app.get("/comments/:commentid/edit",(req,res)=>{
    const {commentid}=req.params
    const comment=comments.find((comment)=>comment.id===commentid)
    res.render("edit",{comment})
})
//update comment with commentid
app.patch("/comments/:commentid", (req,res)=>{
    const {commentid}=req.params
    const comment=comments.find((comment)=>comment.id===commentid)
    comment.user=req.body.user;
    comment.text=req.body.text;
    res.redirect("/comments")
})
//delete a comment
app.delete("/comments/:commentid",(req,res)=>{
const {commentid}=req.params;
    comments=comments.filter((comment)=>comment.id!==commentid)
    res.redirect("/comments")
})
app.listen(port, () => console.log(`Example app listening at http://localhost:3000`))

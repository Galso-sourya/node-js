const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/careerbootcampDB")
.then(()=>console.log("CONNECTION OPEN"))
.catch(()=>console.log("error"));
const movieSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is must"]},//this is for validation
    ratings:
    {type:Number,
        min:1,
        max:[10,"not more than 10"]},
    year:{
        type:Number,
        default:0},
    isWatched:Boolean
})
const Movie=mongoose.model("Movie",movieSchema);
Movie.create([{name:"Avengers-2",rating:4,year:1999,isWatched:false}])
.then(()=>console.log("another movie"));
const Avengers=new Movie({name:"Avengers",year:2015,ratings:8,isWatched:false});
Avengers.save()
.then(()=>console.log("success"))
.catch(()=>console.log("saving failed"))
Movie.findById("648518922f772e9c5a611d95").then(()=>console.log("movie found"))
async function print(){
    const movieName=await Movie.findById("648518922f772e9c5a611d95")
    console.log(movieName)
}
print()
//console.log(Avengers);
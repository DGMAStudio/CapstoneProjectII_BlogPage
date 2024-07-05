//Import Important Dependecies
import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var body = null;

//Set the post array
let posts = [

];

//Set the last post Id
let lastId = 0;

//Run Home Page
app.get("/",async (req,res)=>{
    try {
        res.render("home.ejs");
    } catch(err) {
        console.log(err);
    }
})


//Get New Post
app.post("/",async (req,res)=>{
    try {
        //update post id
        var newId = lastId +=1;
        //get new post title
        var title = req.body.home_title;
        //get new post summary
        var summary = req.body.home_summary;
        //get new post publisher
        var publisher = req.body.home_publisher;
    
        const post = {
            id: newId,
            title: title,
            summary: summary,
            publisher: publisher,
        };
        lastId = newId;
        //Insert New post in the posts array and pass it to the home page
        posts.push(post);
        res.render("home.ejs", {
            posts:posts
        });
    } catch (err) {
        console.log(err);
    }
})

//DELETE POSTS 
app.post("/delete",(req,res)=>{
    //get id of element to delete
    var postId = req.body.dbutton;
    postId = postId.slice(6);
    if (posts.length == 1) {
        posts = [];
    } else {
        console.log(postId);
        posts.splice(postId, 1);
    }          
    res.render("home.ejs", {
        posts:posts
    });
})



app.listen(PORT,async ()=> {
    console.log(`Server is listening on PORT ${PORT}.`);
})
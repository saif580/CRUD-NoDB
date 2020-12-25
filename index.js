const { urlencoded } = require('body-parser');
const express=require('express');
const { url } = require('inspector');
const app=express();
const path=require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

let comments=[
    {
        id:uuid(),
        username:"Saif",
        comment:"Hello, how are you?"
    },
    {
        id:uuid(),
        username:"Arpit",
        comment:"Wassup coder!"
    },
    {
        id:uuid(),
        username:"Anubhav",
        comment:"I Love my job!!"
    },
    {
        id:uuid(),
        username:"Nitin",
        comment:"I love everything"
    }
]


app.get('/',(req,res)=>{
    res.send("CRUD APP");
})
app.get('/comments',(req,res)=>{
    res.render('index.ejs',{comments});
})
app.get('/comments/new',(req,res)=>{
    res.render('new.ejs');
})
app.post('/comments',(req,res)=>{
    const {username,comment}=req.body;
    comments.push({username,comment,id:uuid()});
    res.redirect('/comments')
})
app.get('/comments/:id',(req,res)=>{
    const {id}=req.params;
    const comment=comments.find(c=>c.id===id);
    
    res.render('show.ejs',{comment});
})
app.get('/comments/:id/edit',(req,res)=>{
    const {id}=req.params;
    const comment1=comments.find(c=>c.id===id);
    res.render('edit.ejs',{comment1});
})
app.patch('/comments/:id',(req,res) => {
    const { id } = req.params;
    const newComment =  req.body.comment;
    const foundComment = comments.find(c => c .id === id);
    foundComment.comment=newComment; 
    res.redirect('/comments');
}) 
app.delete('/comments/:id',(req,res)=>{
    const {id}=req.params;
    comments=comments.filter(c=>c.id!==id);
    res.redirect('/comments');
})
app.listen(3000,(req,res)=>{
    console.log("Server is listening to port number 3000");
})
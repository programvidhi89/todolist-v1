const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname +"/date.js");
const app = express();



app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');
app.use(express.static("public"));

const listItem = [];
const workItems = [];
app.get("/",function(req,res){
    // const today = new Date();
    // const currentDay = today.getDate();
    // const day = ["sunday","monday","tuesday","wednessday","thrusday","friday","saturday"];
    // // if(currentDay===6 || currentDay ===0){
    // //     day = "weekend";

      
    // // }else{
    // //     day = "weekday";
        
    // // }
    // // res.render("list",{kindOfDay:day});
    
    // res.render("list",{kindOfDay:day[currentDay]});
    
    const day = date.getDate();
    const text2 = date.text();
    res.render("list",{listTitle:text2,newListItems:listItem});
    



});

app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List",newListItems:workItems})
});
app.get("/about",function(req,res){
    res.render("about");
})


app.post('/',function(req,res){
    
    const item = req.body.list;
    if(req.body.button==="Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        listItem.push(item);
        res.redirect("/");
    }
    
     
     
     res.redirect("/");
    
})

app.listen(3000,function(){
    console.log("Server is running on port 3000");
})
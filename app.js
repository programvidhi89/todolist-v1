const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname +"/date.js");
const app = express();
const mongoose = require('mongoose');
const _ = require("lodash");

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-vidhi:Test123@cluster0.hc11ixe.mongodb.net/todolistDB",{useNewUrlParser:true});

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true]
    }
    
})
const Item = mongoose.model("Item",itemSchema);

const item1 = new Item({
    name:"temple",
    
});
const item2 = new Item({
    name:"Peace",
    
});
const item3 = new Item({
    name:"internal",
    
});

const defaultItems = [item1,item2,item3];

const listSchema = {
    name:String,
    items: [itemSchema]
}
const List = mongoose.model("List",listSchema);


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
    Item.find({},function(err,items){
        if(items.length === 0){
            Item.insertMany(defaultItems,function(err){
                if(err){
                    console.log("err");
                }else{
                    console.log("succecssfully inserted!!");
                }
            });
              res.redirect('/')  ;
        }else{
        res.render("list",{listTitle:"Today",newListItems:items});
        }
    })
    
    



});

// app.get("/work",function(req,res){
//     res.render("list",{listTitle:"Work List",newListItems:workItems})
// });
app.get("/:topic",function(req,res){
    const access1 = _.capitalize(req.params.topic);
    
    List.findOne({name: access1},function(err,lists){
        if(!err){
            if(!lists){
                const list = new List({
                    name:access1,
                    items:defaultItems
                })
                 list.save();
                res.redirect("/"+access1);
            }else{
               res.render("list",{listTitle:lists.name,newListItems:lists.items})
            }
        }
       
     
    });
    
   

 })
app.get("/about",function(req,res){
    res.render("about");
})


app.post('/',function(req,res){
    
    const itemName = req.body.list;
    const listName = req.body.button;
    // if(req.body.button==="Work"){
    //     workItems.push(item);
    //     res.redirect("/work");
    // }else{
    //     listItem.push(item);
    //     res.redirect("/");
    // }
    const newlist = new Item({
        name:itemName
    })
    if(listName==="Today"){
        newlist.save();
        res.redirect("/");
    }else{
        List.findOne({name:listName},function(err,lists){
            if(err){
                console.log("err");
            }else{
                lists.items.push(newlist);
                lists.save();
                res.redirect("/"+ listName);
            }
        })
    }
    // Item.insertMany([newlist],function(err){
    //     if(err){
    //         console.log("err");
    //     }else{
    //         console.log("successfully inserted");
    //         res.redirect("/");
    //     }
    // })

   
    
     
     
     
    
})
app.post("/delete",function(req,res){
    const delete1 = req.body.check1;
    const listName = req.body.listName;
    if(listName==="Today"){
        Item.findByIdAndRemove(delete1,function(err){
            if(err){
                console.log("err");
            }else{
                console.log("successfully deleted");
                res.redirect("/");
            }
    
        })
    }else{
        List.findOneAndUpdate({name:listName},{$pull:{items:{_id:delete1}}},function(err,lists){
            if(!err){
                res.redirect("/"+ listName);
            }
        })
    }
    

})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen( port,function(){
    console.log("Server is running ");
})
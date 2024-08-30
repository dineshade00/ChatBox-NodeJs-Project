const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");




app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // For parse data
app.use(methodOverride("_method"));

main()
  .then(() => { console.log("Connection success") })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chat1 = new Chat({
  from: "neha",
  to: "priya",
  msg: "Send me your exam sheets",
  created_at: new Date(), // Fix: replaced '=' with ':'
});


chat1.save().then((res) => {
  console.log(res);
});



app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  console.log(chats);
  res.render("index", { chats });
});

app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});


// app.get("/chats/:id/edit", async( req ,res) =>{
//     let { id } = req.params;
//     let chat = await Chat.findById(id);
//     res.send("edit.ejs", {chat});
// });

// Edit Route 

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  if (!chat) {
    res.status(404).send({ message: "Chat not found" });
  } else {
    res.render("edit.ejs", { chat }); // not res.send
  }
});

// Update Route
app.put("/chats/:id", async( req , res) =>{
    let { id } = req.params;
    let  { msg : newMsg } = req.body;
    let updateChat = await Chat.findByIdAndUpdate(
      id,
      { msg : newMsg },
      { runValidators : true , new : true }
    );
    console.log(updateChat);
    res.redirect("/chats");
});


// DELETE Routes
app.delete("/chats/:id", async(req , res) =>{
     let { id } = req.params;
     let deleteChat = await Chat.findByIdAndDelete(id);

    console.log(deleteChat);
    res.redirect("/chats");
    });

app.get("/", (req, res) => {
  res.send("Working");
});


app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date()
  });
  newChat.save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");

});


app.listen(8080, () => {
  console.log("Server success");
});
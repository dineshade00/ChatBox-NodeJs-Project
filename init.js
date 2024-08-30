const mongoose = require("mongoose");
const Chat = require("./models/chat.js")


main()
  .then(() => {console.log("Connection success")})
  .catch(err => console.log(err));


async function main(){
	await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}



let allChats = [

    {
     from: "neha",
     to: "priya",
     msg: "Send me your exam sheets",
     created_at: new Date(), // Fix: replaced '=' with ':'
    },
    {
     from: "nehal",
     to: "kunal",
     msg: "Send me your exam sheets",
     created_at: new Date(), // Fix: replaced '=' with ':'
    },
    {
     from: "ram",
     to: "sham",
     msg: "Send me your exam sheets",
     created_at: new Date(), // Fix: replaced '=' with ':'
    },
    {
     from: "amit",
     to: "sumit",
     msg: "Congratulations",
     created_at: new Date(), // Fix: replaced '=' with ':'
    },

];



Chat.insertMany(allChats);


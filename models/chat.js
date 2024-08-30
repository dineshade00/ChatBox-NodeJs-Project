const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({ // Fix: replaced 'chatSchema' with 'Schema'
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  msg: {
    type: String,
    maxLength: 50
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now // You can also add a default value for created_at
  }
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
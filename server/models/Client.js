const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  password: {
    type: String,
    default: "1234",
  },
});

module.exports = mongoose.model("Client", ClientSchema);

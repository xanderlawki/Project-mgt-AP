const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => {
      console.log("okrrrrrrrrrrrrrrrr");
    })
    .catch((err) => {
      console.log(err);
    });

  // console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;

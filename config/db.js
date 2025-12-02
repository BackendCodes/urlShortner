const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB is connected Successfully")
  } catch (error) {
    if (err) {
      console.log("error occured at database connection : ", err.message);
    }
  }
};

module.exports = connectDB;

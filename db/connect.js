const mongoose = require("mongoose");

const ConnectDB = (URI) => {
  const DB_URI = URI;

  if (mongoose.connections[0].readyState) {
    console.log("already connected");
    return;
  }

  return mongoose
    .connect(DB_URI)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
};

module.exports = ConnectDB;

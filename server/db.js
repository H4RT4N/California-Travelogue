const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected..."))
  .catch((err) => console.log(err));

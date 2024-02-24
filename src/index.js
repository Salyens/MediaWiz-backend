const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const routes = require("./routes");
const cors = require("cors");
// const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());
app.use(routes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((e) => console.log(e));

app.listen(process.env.PORT, () =>
  console.log(`App is listening port ${process.env.PORT}`)
);

// const password = bcrypt.hashSync("host1234!", 10);
// console.log(password);

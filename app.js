const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // User.findById("5c618c21e68fbe03c8a2c379")
  //   .then(user => {
  //     req.user = new User(user.name, user.email, user.cart, user._id); //storing sequelize request
  //     next();
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://illusionist17:heaven-hunter17@cluster0-pdf2z.mongodb.net/shop?retryWrites=true"
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err));

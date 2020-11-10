const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const auth = require("./route/auth.js");
const authConfig = require("./config/authConfig.js");
const user = require("./route/user.js");
const app = express();


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "restaurant"
});

app.use(
    session({
        name: 'session-id',
        secret: 'scret',
        saveUninitialized: false,
        resave: false,
        cookie: {
            expires: 600000
        }
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Connected to Restaurant" });
});


require("./route/produk_route.js")(app);
require("./route/paket_route.js")(app);
require("./route/pesan_route.js")(app);

app.use(passport.initialize());
app.use(passport.session());
authConfig(passport);
app.use("/auth", auth);
app.use("/user", user);

app.listen(3000, () => {
  console.log("Server is running on port 3000.")
});
db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
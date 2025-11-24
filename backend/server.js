const express = require("express");
const exphbs = require("express-handlebars");
const cookieSession = require("cookie-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;


const users = []; 
const comments = []; 

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));


app.use(
  cookieSession({
    name: "session",
    keys: ["superinsecurekey"], 
    maxAge: 24 * 60 * 60 * 1000, 
  })
);

//View Engine 
app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Debug Logger 
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});



// Routes

// Home
app.get("/", (req, res) => {
  res.render("index", {
    title: "pdf page",
    username: req.session.username,
  });
});




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


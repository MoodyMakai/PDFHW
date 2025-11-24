const express = require("express");
const exphbs = require("express-handlebars");
const cookieSession = require("cookie-session");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));



//View Engine 
app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    //partialsDir: path.join(__dirname, "views/partials"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Debug Logger 
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware


// Routes

// Home
app.get("/", (req, res) => {
  res.render("index", {
    title: "pdf stuff"
  });
});




// files 
app.get("/files", (req, res) => {
  res.render("files", { title: "files" });
});






app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

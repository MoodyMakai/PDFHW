
const express = require("express");
const exphbs = require("express-handlebars");
const cookieSession = require("cookie-session");
const path = require("path");
const fs = require("fs");

const { route } = require("./modules/router"); 
const app = express();
const PORT = process.env.PORT || 3000;


// middleware

app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "../public")));


// View Engine 
app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});


app.get("/", (req, res) => {
  res.render("index", {
    title: "pdf stuff"
  });
});


app.use('/files', route);
app.use('/pdf', route);


//app.use("/", route.createRouter());

app.use((req, res) => {
    res.status(404).render('404');
});



app.listen(PORT, "0.0.0.0", () => {
  console.log(`HTTP server running on port ${PORT}`);
});


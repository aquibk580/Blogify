const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const PORT = 8000;
const app = express();
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const Blog = require("./models/blog");
const connectToMongo = require("./db");
const { checkForAuthenticationCookie } = require("./middleware/auth");

connectToMongo();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  return res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.listen(PORT, () => {
  console.log(`Server started at Port : ${PORT}`);
});

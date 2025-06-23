require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const userRouter = require("./routes/user")
const blogRouter = require("./routes/blog")
const { connectToDB } = require("./db/dbConnect")
const cookieParser = require("cookie-parser")
const { checkForAuthentication } = require("./services/auth")
const session = require("express-session")
const { Blog } = require("./model/blog")

// connect to db
connectToDB(process.env.MONGO_DB_URL)
    .then(console.log("Connected to DB..."))
    .catch((err) => console.log("Err Connection in DB... ", err))

//setting ejs
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// middlewares
app.use(express.static("./public"))
// app.use(express.static(path.resolve("./public")))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(checkForAuthentication())

// routes
app.use("/user", userRouter)
app.use("/blog", blogRouter)
app.get("/", async(req, res) => {
    const allBlogs = await Blog.find({})
    const msg = req.session.msg
    delete req.session.msg
    
    return res.render("home", {
        user: req.user,
        msg,
        blogs: allBlogs,
    })
})


// server 
const PORT = process.env.PORT
app.listen(PORT, () => console.log("Server is running... ", PORT))
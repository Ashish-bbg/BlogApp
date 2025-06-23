const { Router } = require("express")
const router = Router()
const { handleAddBlog, handleGetPostById, handleUserCommentByPostId } = require("../controllers/blog")
const upload = require("../controllers/multerFileControl")
const { autherizeCheckForUserLogin } = require("../services/auth")

router.get("/add-blog", autherizeCheckForUserLogin, (req, res) => {
    return res.render("add-blog", {
        user: req.user
    })
})

router.get("/:id", handleGetPostById)

router.post("/add-blog", autherizeCheckForUserLogin, (req, res) => { 
    upload.single("coverImage")(req, res, function (err){
        if(err){
            console.error("Upload error:", err.message);
            return res.status(400).render("add-blog", {
                err: err.message,
                user: req
            })
        }
        handleAddBlog(req, res)
    })

},
     )
router.post("/comment/:id", handleUserCommentByPostId)


module.exports = router
const { Blog } = require("../model/blog")
const {Comment} = require("../model/comment")

async function handleAddBlog(req, res) {
    const { title, body } = req.body
    console.log(req.file);
    
    if(!req.file){
        return res.status(400).send("No file uploaded or invalid file type only jpg/png allowed")
    }
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImage: req.file.path
    })

    return res.redirect(`/blog/${blog._id}`)
}

async function handleGetPostById(req, res) {
    const id = req.params.id
    const blog = await Blog.findById(id).populate("createdBy")
    await blog.updateOne({$inc:{cnt:1}})
    const comments = await Comment.find({blogId: id}).populate("createdBy")
    // console.log(blog);
    // Blog.findByIdAndUpdate({cnt})
    // const createdAt = blog.createdAt.toDateString() +" "+ blog.createdAt.toLocaleTimeString()
    const createdAt = blog?.createdAt?.toDateString() || "Unkonwn date"
    // const createdAt = blog.createdAt

    // console.log(blog);
// console.log(comments);

    
    return res.render("blog-post", {
        user: req.user,
        blog,
        createdAt,
        comments,
    })
    
}

async function handleUserCommentByPostId(req, res) {
    await Comment.create({
        content: req.body.comment_body,
        createdBy: req.user._id,
        blogId: req.params.id  
    })
    return res.redirect(`/blog/${req.params.id}`)
}

module.exports = {
    handleAddBlog,
    handleGetPostById,
    handleUserCommentByPostId,
}
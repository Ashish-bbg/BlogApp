const { Schema, model } = require("mongoose")

const blogSchema = new Schema({

    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT49g5L-ge_gWmBsWFAH40JtRyPrmazJ-_UP4TF_GcA9_Qkx8mqos6GXsCqFipUmQrblM8&usqp=CAU",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }


}, { timestamps: true })

const Blog = model("Blog", blogSchema)

module.exports = {
    Blog,
}
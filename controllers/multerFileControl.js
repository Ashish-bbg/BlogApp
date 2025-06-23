const cloudinary = require("cloudinary").v2
const {CloudinaryStorage} = require("multer-storage-cloudinary")
const multer = require('multer')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/uploads')
//     }, filename: function (req, file, cb) {
//         cb(null, `${Date.now().toString()} - ${file.originalname}`)
//     }
// })

function checkFileType(file){
    const allowedType = ['image/jpeg', 'image/png', 'image/jpg']
    if(!allowedType.includes(file)){
        return 0;
    }
    return 1;
}


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file)=>{
        const c = checkFileType(file.mimetype)
        if(c===0)
            throw new Error("❌ Only image file allowed jpg/png")
        
       return  {
            folder: "Blog-App-Images",
            allowed_formats: ['jpg', 'jpeg', 'png'],
        }
    } 
    
})

const upload = multer({ storage: storage })

module.exports = upload
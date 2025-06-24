const { createHmac, randomBytes } = require("node:crypto")
const { Schema, model } = require("mongoose")
const {generateCookieToken} = require("../services/auth")

const userSchema = new Schema({
    fullName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    salt: {
        type: String,
        select: false,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    profileImageUrl: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT49g5L-ge_gWmBsWFAH40JtRyPrmazJ-_UP4TF_GcA9_Qkx8mqos6GXsCqFipUmQrblM8&usqp=CAU"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
}, { timeseries: true })

// executes before saving in databse (while doing signup)
userSchema.pre("save", function (next) {
    const user = this
    if (!user.isModified("password")) return next();
    const secret = randomBytes(16).toString()
    user.password = hashPassword(user.password, secret)
    user.salt = secret
    next()
})


function hashPassword(password, secret) {
    const hash = createHmac("sha256", secret)
        .update(password)
        .digest("hex")
    return hash
}

// this runs on user sigin

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await User.findOne({ email }).select("+password +salt")
    // console.log("This",user);
    
    if (!user){
        throw new Error("User Not Found!")

    }
    const secret = user.salt
    const hashPass = hashPassword(password, secret)

    if (hashPass !== user.password)
        throw new Error("Incorrect Password")
    // user name and password is correct so execute below
    // generate cookie token and get token
    let userObj = user.toObject() 
    const safeUser = {
        ...userObj,
        password: undefined,
        salt: undefined,
    }
    
    const token = generateCookieToken(safeUser)
    return token

})

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.salt;
    return ret;
  }
});


const User = model("User", userSchema)

module.exports = { User }
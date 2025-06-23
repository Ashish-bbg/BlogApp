const JWT = require("jsonwebtoken")

const secret = "My$ecreTKe&&6"

// generating token
function generateCookieToken(user) {
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageURL: user.profileImageUrl,
        role: user.role
    }

    return JWT.sign(payload, secret)
}

function checkForAuthentication() {
    return (req, res, next) => {
        const token = req.cookies?.token
        if (!token)
            return next();
        try {
            const user = JWT.verify(token, secret)
            // console.log(user);
            req.user = user
            // console.log(req.user);

        } catch (error) {

        }
        return next()
    }
}

function autherizeCheckForUserLogin(req, res, next) {
    if (!req.user)
        return res.redirect("/")
    next()
}

module.exports = {
    generateCookieToken,
    checkForAuthentication,
    autherizeCheckForUserLogin,
}
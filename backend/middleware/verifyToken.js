const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) return res.status(403).json("Token not valid")
            console.log('Authenticated: Valid Token');
            req.user = user;
            next()
        })
    } else {
        res.status(401).json("You are not authenticated")
    }
}

const verifyTokenAndAuthZ = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req.body);
        if (req.user.id === req.body.user_id ) {
            next()
        } else {
            res.status(403).json("Not Authorized")
        }
    })
}


const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            console.log('Administrator');
            next()
        } else {
            res.status(403).json("Not Authorized: Administrator privileges required")
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthZ, verifyTokenAndAdmin }
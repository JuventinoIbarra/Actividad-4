const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json("No token");

    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401).json("Token Invalido");

    try{
        jwt.verify(token, process.env.JWT_SECRET || "testsecret");
        next();
    }catch{
        res.status(401).json("Token invalido");
    }
}
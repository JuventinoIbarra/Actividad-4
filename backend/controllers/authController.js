const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req,res)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).json("No existe");

    const valid = await bcrypt.compare(req.body.password, user.password);
    if(!valid) return res.status(400).json("Error password");

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET || "testsecret");
    res.json({token});
}

exports.register = async (req, res)=>{
    try{
    const {email, password} = req.body

    const userExists = await User.findOne({email});
    if(userExists) return res.status(400).json({message: "Usuario ya existe"})

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        email,
        password: hashedPassword}
    );

    res.status(201).json({message: "Usuario Creado exitosamente"})
    }catch(error){
        console.error("Error register: ", error);
        res.status(500).json({
            message: "Error en el registro",
            error: error.message})
    }
}
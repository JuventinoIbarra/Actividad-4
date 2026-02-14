const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
    res.json(await Product.find())
}

exports.createProducts = async (req,res) => {
    res.status(201).json(await Product.create(req.body));
}

exports.deleteProducts = async (req,res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json("Eliminado")
}

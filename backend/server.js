require("dotenv").config();
const express = require('express');
const cors = require('cors');
const connectDB = require("./config/db.js")
const PORT = 3000;
const authRoutes = require("./routes/authRoutes.js")
const productRoutes = require("./routes/productRoutes.js")

const app = express();

if (process.env.NODE_ENV !== "test"){
    connectDB();
}

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


if (process.env.NODE_ENV !=="test"){
    app.listen(PORT, ()=> {
        console.log(`Servidor corriendo en el puerto: ${PORT}`);
    })
}

module.exports = app;
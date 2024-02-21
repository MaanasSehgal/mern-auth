const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.error("Database not connected", err);
    });

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

app.use("/", authRoutes);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

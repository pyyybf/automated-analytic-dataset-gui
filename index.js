const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const path = require("path");

var app = express();

app.use(cors()).use(cookieParser());

// Static file directory
app.use(express.static(path.join(__dirname, "build")));

// Handle routing for single page applications, return index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
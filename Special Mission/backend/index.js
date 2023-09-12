const express = require("express");
const path = require('path');
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bookRoute = require("./routes/BookRoute.js");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(bookRoute);

app.listen(5000, () => console.log('Server Up and Running...'));

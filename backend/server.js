const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const router = require('./routes/taskRoute')

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.use('/api', router)

app.get("/", (req, res) => {
    res.send("API is running...");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on localhost: ${PORT}`);
})
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const taskRouter = require("./routes/taskRoute");
const authRouter = require("./routes/authRoute");

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());


// Auth routes
app.use("/api/auth", authRouter);


// Task routes
app.use("/api", taskRouter);


app.get("/", (req, res) => {
    res.send("API is running...");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on localhost: ${PORT}`);
});
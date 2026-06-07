const rateLimit = require("express-rate-limit"); 

const cors = require("cors"); 

require("dotenv").config();

const express = require("express");

require("./config/db");

const app = express();

// Middleware
app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);

app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const jobRoutes = require("./routes/jobRoutes");
app.use("/api", jobRoutes);

const applicationRoutes = require("./routes/applicationRoutes");
app.use("/api", applicationRoutes);

// Error Middleware
const errorHandler = require("./middleware/errorHandler");

app.get("/", (req, res) => {
    res.send("Job Portal API Running");
});

// Error Handler should be after routes
app.use(errorHandler);

// Server Start
app.listen(process.env.PORT, () => {
    console.log(`Server Running On Port ${process.env.PORT}`);
});
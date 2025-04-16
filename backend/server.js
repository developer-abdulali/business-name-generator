import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./config/dbConnection.js";

// routes
import userRouter from "./routes/authRoutes.js";
import pollRouter from "./routes/pollRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const allowedOrigins = ["http://localhost:5173", "https://abdulali.vercel.app"];

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/poll", pollRouter);

// Serve uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to the database
await dbConnection();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Polling App Server is running...");
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

export default app;

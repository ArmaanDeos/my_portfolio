import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import dotenv from "dotenv";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import timelineRoutes from "./routes/timeline.routes.js";
import applicationRoutes from "./routes/applicationUse.routes.js";
import skillRoutes from "./routes/skills.routes.js";
import projectsRoutes from "./routes/projects.routes.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure the destination directory exists
import fs from "fs";
const tempDir = path.join(__dirname, "./public/temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const allowedOrigins = [process.env.CORS_ORIGIN_1, process.env.CORS_ORIGIN_2];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps, curl requests)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// middlewares
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//     optionsSuccessStatus: 200,
//   })
// );

app.use(express.json({ limit: "16kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

// static files
app.use(express.static("public"));

app.use(cookieParser());

// routes
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/timeline", timelineRoutes);
app.use("/api/v1/application", applicationRoutes);
app.use("/api/v1/skills", skillRoutes);
app.use("/api/v1/projects", projectsRoutes);
export { app };

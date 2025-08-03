import express from "express";
import dotenv from "dotenv";
import connectToMongo from "./utils/connectDB";
import cors from "cors";
import AuthRoute from "./routes/authRoutes";
import UserRoute from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.use(cors({ 
    origin: ["http://localhost:5173" , 
            "https://localhost:5173"
    ], credentials: true }));

dotenv.config();
connectToMongo();

app.use("/api/v1/user", AuthRoute);
app.use("/api/v1", UserRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
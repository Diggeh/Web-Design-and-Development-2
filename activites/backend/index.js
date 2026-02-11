import experess from "express";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = experess();
const PORT = 3000;
dotenv.config();
// get -> display name, var name = "Your Name"
// post -> logic, if username="admin" and password="admin" -> success else failed

app.use(experess.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET,POST"],
  }),
);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on PORT: ${PORT}`);
});

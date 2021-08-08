const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dishRoutes = require("./routes/dishes.routes");
const authRoutes = require("./routes/auth.routes");

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Live now"));
app.use("/api", dishRoutes);
app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  console.log("Theres an error: ", err);
});

mongoose
  .connect(process.env.MONGODB_URI || process.env.LOCAL_MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(process.env.LOCAL_PORT, () => {
      console.log(`Live at http://localhost:${process.env.LOCAL_PORT}`);
    });
  });

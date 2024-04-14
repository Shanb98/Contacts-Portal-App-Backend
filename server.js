const express = require("express");
const dotenv = require("dotenv");
const connectiondb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

const app = express();
dotenv.config();
connectiondb();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.options("*", cors());
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });


  
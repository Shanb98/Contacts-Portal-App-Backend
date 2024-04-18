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
app.use(cors({
  origin: 'https://contacts-portal-app-frontend-eenlgt3cn-shans-projects-efa8fcf1.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.options("*", cors());


app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });



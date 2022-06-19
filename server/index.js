require("./models/userModel");
require("./models/noteModel");
require("./models/taskModel");
require("./config/passport");
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const path = require("path");
const passport = require("passport");

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const taskRoutes = require("./routes/taskRoutes");
const timerRoutes = require("./routes/timerRoutes");

const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();

const PORT = process.env.PORT || 5000;

app.disable("x-powered-by");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const clientP = mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((m) => m.connection.getClient())
  .catch((err) => console.log(err.message));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: clientP,
    }),
    cookie: {
      //missing some more configs, add later:
      //secure
      //samesite
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
app.use("/tasks", taskRoutes);
app.use("/timer", timerRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

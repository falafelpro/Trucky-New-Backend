const express = require("express");
const connectDB = require("./db/database");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const userRoutes = require("./api/users/users.routes");
const truckRoutes = require("./api/trucks/trucks.routes");
const menuRoutes = require("./api/dishes/dish.routes");
const customerRoutes = require("./api/customer/customer.routes");

const { localStrategy, jwtStrategy } = require("./middleware/passport");

const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(cors());

// Routes

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/api", userRoutes);
app.use("/api/trucks", truckRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/menu", menuRoutes);

app.use((req, res, next) =>
  res.status(404).json({ message: "Path not found" })
);

app.use(errorHandler);
//app.disable("etag");
const PORT = 8000;
app.listen(PORT, () => console.log(`Application running on localhost:${PORT}`));

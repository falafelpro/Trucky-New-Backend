const User = require("../../db/models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");
const Truck = require("../../db/Models/Truck");

const createToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPass;
    const newUser = await User.create(req.body);
    // create an empty truck for registered owners
    if (req.body.role === "owner") {
      await Truck.create({
        owner: newUser._id,
        name: `${newUser.username} Truck`,
        image: "",
        dishes: [],
        speciality: "",
      });
    }

    const token = createToken(newUser);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const token = await createToken(req.user);
  res.status(200).json({ token });
  console.log({ token });
};

exports.updateCredentials = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPass;

    const foundUser = await User.findById(req.body._id);
    if (foundUser) {
      await foundUser.update(req.body);
      const updatedUser = await User.findById(req.body._id);
      const token = createToken(updatedUser);

      return res.status(200).json({ token });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateUserDetail = async (req, res, next) => {
  try {
    console.log(req);
    const foundUser = await User.findById(req.user._id);
    if (foundUser) {
      await foundUser.update(req.body);
      // update dont return the newly inserted array so im calling the FindbyId again
      // do you know other work-around
      const token = createToken(await User.findById(req.user._id));
      return res.status(200).json({ token });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

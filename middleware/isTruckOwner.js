const isTruckOwner = (err, req, res, next) => {
  if (!req.user.equals(req.truck.owner)) {
    return next({
      status: 401,
      message: "You're not the truck owner!!!",
    });
  } else {
    next();
  }
};
module.exports = isTruckOwner;

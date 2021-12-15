const express = require("express");
const passport = require("passport");

const upload = require("../../middleware/multer");

const {
  fetchCustomerById,
  customerUpdate,
  fetchCustomer,
} = require("./customer.controllers");

const router = express.Router();

router.param("userId", async (req, res, next, userId) => {
  const customer = await fetchCustomerById(userId, next);
  if (customer) {
    req.customer = customer;
    next();
  } else {
    next({ status: 404, message: "Customer Not Found!" });
  }
});

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  fetchCustomer
);
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  customerUpdate
);

module.exports = router;

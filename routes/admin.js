const express = require("express");
const { check, body } = require("express-validator/check");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

router.get("/products", isAuth, adminController.getProducts);

// // /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title", "Please Enter a Valid Title")
      .isLength({ min: 3 })
      .isString()
      .trim(),
    body("price", "Please Check your Price")
      .isFloat()
      .trim(),
    body("imageUrl", "Please Enter a valid URL").isURL(),
    body("description", "Please Enter Description with minimum 4 characters")
      .isLength({ min: 4, max: 400 })
      .trim()
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title", "Please Enter a Valid Title")
      .isLength({ min: 3 })
      .isString()
      .trim(),
    body("price", "Please Check your Price")
      .isFloat()
      .trim(),
    body("imageUrl", "Please Enter a valid URL").isURL(),
    body("description", "Please Enter Description with minimum 4 characters")
      .isLength({ min: 4, max: 400 })
      .trim()
  ],
  isAuth,
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;

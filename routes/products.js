const express = require("express");
const router = express.Router();

// middlewares
const { GetProduct, GetAllProducts } = require("../controllers/products");

router.route("/").get(GetAllProducts);
router.route("/:id").get(GetProduct);

module.exports = router;

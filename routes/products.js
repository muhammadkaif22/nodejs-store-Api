const express = require("express");
const router = express.Router();

// middlewares
const {
  GetProduct,
  GetAllProducts,
  CreateProducts,
  UpdateProduct,
  DeleteProduct,
} = require("../controllers/products");

router.route("/").get(GetAllProducts).post(CreateProducts);
router.route("/:id").get(GetProduct).patch(UpdateProduct).delete(DeleteProduct);

module.exports = router;

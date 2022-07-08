const ProductsModal = require("../models/Product");
const FakeData_Products = require("../fakeData/products.json");
const asyncWapper = require("../middlewares/asyncWapper");

const GetAllProducts = asyncWapper(async (req, res) => {
  const action = await ProductsModal.find({});
  res
    .status(200)
    .json({ msg: "all products fetched successfully", data: action });
});

const GetProduct = asyncWapper(async (req, res) => {
  const { id } = req.params;
  if (id.length >= 24) {
    const action = await ProductsModal.findById(id);
    if (action) {
      res
        .status(200)
        .json({ msg: "product fetched successfully", data: action });
    } else {
      res
        .status(500)
        .json({ msg: "cannot Find the Product please try again " });
    }
  } else {
    res.status(500).json({ msg: "something went wrong" });
  }
});

const CreateProducts = asyncWapper(async (req, res) => {
  const action = await ProductsModal.create(FakeData_Products);
  res.status(200).json({ msg: "Product created successfully", data: action });
});

const UpdateProduct = asyncWapper(async (req, res) => {
  const { id } = req.params;
  await ProductsModal.findByIdAndUpdate(id, req.body);
  res.status(200).json({ msg: "update the product successfully" });
});

const DeleteProduct = asyncWapper(async (req, res) => {
  const { id } = req.params;
  await ProductsModal.findByIdAndDelete(id);
  res.status(200).json({ msg: "delete the product successfully" });
});

module.exports = {
  GetAllProducts,
  GetProduct,
  CreateProducts,
  UpdateProduct,
  DeleteProduct,
};

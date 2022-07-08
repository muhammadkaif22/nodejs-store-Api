const ProductsModal = require("../models/Product");
const FakeData_Products = require("../fakeData/products.json");
const asyncWapper = require("../middlewares/asyncWapper");

// ===================> CRUD Operations <====================

const GetAllProducts = asyncWapper(async (req, res) => {
  // querys
  const { featured, company, search_query, sortby, selecteFld } = req.query;
  let queryObj = {};

  if (featured) queryObj.featured = featured === "true" ? true : false;

  if (company) queryObj.company = company;

  // search
  if (search_query) queryObj.name = { $regex: search_query };

  const fetchData = ProductsModal.find(queryObj);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  fetchData.limit(limit).skip(skip);

  // sorting the data
  if (sortby) {
    const sortQuerys = sortby.split(",").join(" ");
    fetchData.sort(sortQuerys);
  }
  // selecte by Flds
  if (selecteFld) {
    const FillterdFld = selecteFld.split(",").join(" ");
    fetchData.select(FillterdFld);
  }
  const action = await fetchData;

  if (action.length !== 0) {
    res.status(200).json({
      msg: "all products fetched successfully",
      dataLength: action.length,
      data: action,
    });
  } else {
    res.status(200).json({ msg: "no record founded" });
  }
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

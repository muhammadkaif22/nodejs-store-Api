const GetAllProducts = (req, res) => {
  res.status(200).json({ msg: "all products fetched successfully" });
};
const GetProduct = (req, res) => {
  res.status(200).json({ msg: "product fetched successfully" });
};

module.exports = {
  GetAllProducts,
  GetProduct,
};

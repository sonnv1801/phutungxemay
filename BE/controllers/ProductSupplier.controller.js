const ProductSupplier = require("../models/ProductSupplier");

const cloudinary = require("../utils/cloudinary");

const productSupplierController = {
  createProduct: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "QUANLYPHUTUNG",
      });
      let newProduct = new ProductSupplier({
        image: result.secure_url,
        agentCode: req.body.agentCode,
        productCode: req.body.productCode,
        salePrice: req.body.salePrice,
        retailPrice: req.body.retailPrice,
        wholesalePrice: req.body.wholesalePrice,
        name: req.body.name,
        quantity: req.body.quantity,
        supplier: req.body.supplier,
        link: req.body.link,
      });
      await newProduct.save();
      res.status(200).json(newProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getProductByLink: async (req, res) => {
    try {
      const link = req.params.link;
      const limit = req.params.limit;
      const prdbylink = await ProductSupplier.find({ link: link }).limit(limit);
      return res.status(200).json(prdbylink);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getProductById: async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await ProductSupplier.findOne({ _id: productId });

      if (!product) {
        return res.status(404).json({ error: "Không tìm thấy sản phẩm" });
      } else {
        return res.json(product);
      }
    } catch (error) {
      console.error("Lỗi truy vấn MongoDB:", error);
      return res.status(500).json({ error: "Lỗi truy vấn dữ liệu" });
    }
  },
};

module.exports = productSupplierController;

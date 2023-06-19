const productSupplierController = require("../controllers/ProductSupplier.controller");
const upload = require("../utils/multer");
const router = require("express").Router();
router.post(
  "/",
  upload.single("image"),
  productSupplierController.createProduct
);
router.get("/:link/:limit", productSupplierController.getProductByLink);
router.get("/:id", productSupplierController.getProductById);
module.exports = router;

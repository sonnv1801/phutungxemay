const supplierController = require("../controllers/Supplier.controller");

const router = require("express").Router();
router.post("/", supplierController.createSupplier);
router.get("/", supplierController.getAllSupplier);
module.exports = router;

const orderComboController = require("../controllers/OrderComBo.controller");
const router = require("express").Router();
router.post("/", orderComboController.createCombo);
router.get("/:customerId", orderComboController.getComboByCustomerID);
module.exports = router;

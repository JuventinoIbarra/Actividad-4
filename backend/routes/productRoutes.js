const router = require("express").Router();
const auth = require("../middleware/auth");
const ctrl = require("../controllers/productController");

router.get("/", auth, ctrl.getProducts);
router.post("/", auth, ctrl.createProducts);
router.delete("/:id", auth, ctrl.deleteProducts);

module.exports = router;
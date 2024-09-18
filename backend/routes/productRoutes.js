const express = require("express");
const {
  isAdmin,
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", isAdmin, addProduct);
router.put("/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProduct);

module.exports = router;

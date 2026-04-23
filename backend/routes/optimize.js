const express = require("express");
const router = express.Router();

const { optimizeQuery } = require("../controllers/optimizeController");

router.post("/", optimizeQuery);

module.exports = router;
const express = require("express");
const router = express.Router();

const { analyzeQuery } = require("../controllers/analyzeController");

router.post("/", analyzeQuery);

module.exports = router;
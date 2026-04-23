const express = require("express");
const router = express.Router();

const { suggestIndexes } = require("../controllers/suggestController");

router.post("/", suggestIndexes);

module.exports = router;
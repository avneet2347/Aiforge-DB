exports.suggestIndexes = (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  console.log("Suggest:", query);

  res.json({
    indexes: [
      "CREATE INDEX idx_name ON users(name)",
      "CREATE INDEX idx_email ON users(email)"
    ]
  });
};
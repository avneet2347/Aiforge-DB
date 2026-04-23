exports.optimizeQuery = (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  console.log("Optimize:", query);

  res.json({
    optimizedQuery: "SELECT name FROM users",
    suggestions: ["Avoid SELECT *", "Use indexes"],
    beforeTime: "2 sec",
    afterTime: "0.5 sec"
  });
};
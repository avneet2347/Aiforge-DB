const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", function(req, res) {
  res.send("Backend working");
});

app.post("/optimize", function(req, res) {
  const query = req.body.query || "";

  res.json({
    optimizedQuery: query + " optimized",
    suggestions: [
      "Use indexes",
      "Avoid SELECT *",
      "Use WHERE clause"
    ],
    beforeTime: "2 sec",
    afterTime: "0.5 sec",
    improvement: "75%"
  });
});

const PORT = 5000;

app.listen(PORT, function() {
  console.log("Server running on http://localhost:5000");
});


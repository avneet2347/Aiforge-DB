const tables = {
  users: ["id", "name", "age", "email"],
  orders: ["order_id", "customer_id", "amount"],
  products: ["product_id", "name", "price"]
};

const keywords = [
  "SELECT",
  "FROM",
  "WHERE",
  "JOIN",
  "ORDER BY",
  "GROUP BY"
];

module.exports = { tables, keywords };
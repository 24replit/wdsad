const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("I'm alive");
});

app.listen(8080, () => {
  console.log("Keep-alive server running on port 8080");
});

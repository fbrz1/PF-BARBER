const { Router } = require("express");

const router = Router();

router.get("/", async (req, res) => {
  const { name } = req.query;
});

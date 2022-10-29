const { Router } = require("express");
const { Score, Product } = require("../db");

const {
  getProductByPk,
  getAllProducts,
  dbCreateProduct,
} = require("../middlewares/getAllProducts");
const router = Router();

router.post("/rating", async (req, res) => {
  try {
    const { productId, userId, score } = req.body;
    // const createScore = await getAllProducts(req.body);
    // let valueScore = info.userScore;
    // let productInfo = { ...info };
    // delete productInfo.userScore;
    const [newScore, created] = await Score.upsert({
      productId,
      score,
      userId,
    });
    const scores = await Score.findAll({
      where: {
        productId: id,
      },
    });
    //let average = Object.values(scores);

    const sum = scores.reduce((acc, i) => {
      return acc + i.score;
    }, 0);
    let prom = sum / scores.length;
    await Product.update(
      {
        score: prom,
      },
      {
        where: { id: productId },
      }
    );
    res.json({
      average: prom,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/rating/:id", async (req, res) => {
  try {
    const product = await getProductByPk(req.params.id);
    res.json({
      average: product.score,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

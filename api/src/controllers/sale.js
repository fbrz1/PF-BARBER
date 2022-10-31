const { Router } = require("express");
const { getDBSalesByUser, dbCreateSale, dbUpdateSale } = require('../middlewares/getAllSales.js')
const { getDBDetailSales, getDBDetailSalesByPk, getDBDetailSalesValidateStock } = require("../middlewares/getAllDetailSales.js");
const { getDBUserByPk } = require("../middlewares/getAllUsers.js");
const { dbUpdateProduct } = require("../middlewares/getAllProducts");
const router = Router();

router.get("/user/:userId", async (req, res) => {
    try {
        const sales = await getDBSalesByUser(req.params.userId);
        res.status(200).json(sales);
    } catch (error) {
        res.status(404).send(error.message);
    }
});


router.post('/user/:userId', async (req, res) => {
    try {
        const user = await getDBUserByPk(req.params.userId);
        let detailSales = await getDBDetailSales(req.params.userId)
        if (detailSales.length) {
            const createdSale = await dbCreateSale(req.body, user, detailSales, dbUpdateProduct, getDBDetailSalesValidateStock)
            res.status(200).send(createdSale);
        } else {
            throw new Error('detail sales not found')
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
})
router.put("/:saleId", async (req, res) => {
    try {
        const updatedSale = await dbUpdateSale(req.body, req.params.saleId);
        res.status(200).send(updatedSale);
    } catch (error) {
        res.status(404).send(error.message);
    }
});
module.exports = router;
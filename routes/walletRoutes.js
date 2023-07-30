const { createWallet, onWalletTransaction, getAllTransactions, getWalletDetails } = require('../controllers/walletControllers');

const router = require('express').Router();
router.post("/setup",createWallet);
router.post("/transact/:walletId",onWalletTransaction);
router.get("/transactions",getAllTransactions);
router.get("/wallet/:id",getWalletDetails);
module.exports = router;
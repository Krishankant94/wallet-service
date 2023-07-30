const { v4: uuidv4 } = require('uuid');
const wallet = require("../modals/wallet");
const transaction = require("../modals/transaction");
const asyncWrapper = require('../middleware/asyncWrapper');

//@ to initialize a new wallet
//@ POST 
//@ Public
const createWallet = asyncWrapper(async (req, res) => {
  const { balance, name } = req.body;
  const date = JSON.stringify(new Date().getTime());
  const walletId = uuidv4();
  const result = await wallet.create({ name, balance, date, walletId });
  res.status(200).json(
    {
      result
    }
  );
})

//@ to update the wallet transaction 
//@ POST 
//@ Public
const onWalletTransaction = asyncWrapper(async (req, res) => {
  const { walletId } = req.params;
  const { amount, description } = req.body;
  const date = JSON.stringify(new Date().getTime());
  const transactionId = uuidv4();
  const type = (amount > 0) ? 'CREDIT' : 'DEBIT';
  const { balance: walletBal } = await wallet.findOne({ walletId });
  const balance = (walletBal + amount).toFixed(4);
  if(balance>=0){
    const result = await transaction.create({ description, amount:amount.toFixed(4), date, transactionId, type, balance, walletId });
    await wallet.findOneAndUpdate({ walletId }, { $set: { balance: balance } })
    res.status(200).json(
      {
        result
      }
    );
  }
  else {
    res.status(500).json(
      {
        error:'amount is not sufficient!'
      }
    );
  }
})

//@ to get all wallet transaction 
//@ GET 
//@ Public
const getAllTransactions = asyncWrapper(async (req, res) => {
  const { walletId, skip, limit } = req.query;
  const resultArr = await transaction.find({ walletId });
  const result = resultArr.slice(skip, skip + limit);
  res.status(200).json(
    {
      result
    }
  );
})

//@ to get wallet details
//@ GET 
//@ Public
const getWalletDetails = asyncWrapper(async (req, res) => {
  const { id: walletId } = req.params;
  const result = await wallet.findOne({ walletId });
  res.status(200).json(
    {
      result
    }
  );
})

module.exports = {
  createWallet,
  onWalletTransaction,
  getAllTransactions,
  getWalletDetails,
}
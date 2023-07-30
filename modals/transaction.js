const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    transactionId : String,
    walletId:String,
    amount : Number,
    balance: Number,
    description : String,
    date : String,
    type : String,
 })

 module.exports = mongoose.model('Transaction',TransactionSchema,'Transactions');
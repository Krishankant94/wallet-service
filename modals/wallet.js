const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
    balance:Number,
    name: String,
    date:String, 
    walletId:String,
})

module.exports =  mongoose.model('Wallet', WalletSchema, 'Wallets');
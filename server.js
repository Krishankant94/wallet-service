const express = require('express');
const connectToDB = require('./db/connect');
const cors = require('cors');
require('dotenv').config();
const walletRouter = require('./routes/walletRoutes');
const app = express();

app.use(cors());

//Middlewares
app.use(express.json())

//Routes
app.use('/api/v1',walletRouter);

const start = async () => {
  try {
    await connectToDB(process.env.MONGO_DB_URI);
    app.listen(process.env.PORT, () => console.log('app is listening on ' + process.env.PORT));
  }
  catch (err) {
    console.log(err);
  }
}

start();

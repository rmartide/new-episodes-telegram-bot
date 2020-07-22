const mongoose = require('mongoose');
const mongoPort = process.env.MONGO_PORT || 27017;
const host = process.env.HOST;
mongoose.connect(`mongodb://${host}:${mongoPort}/Episodes`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', err => {
    console.log(err);
  });
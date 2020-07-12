const mongoose = require('mongoose');
const mongoPort = process.env.MONGO_PORT || 27017;
mongoose.connect(`mongodb://localhost:${mongoPort}/Episodes`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', err => {
    logError(err);
  });
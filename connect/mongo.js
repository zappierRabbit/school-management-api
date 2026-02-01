const mongoose = require('mongoose');

module.exports = ({ uri }) => {
  if (!uri) {
    throw new Error('MONGO_URI is required');
  }

  mongoose.connect(uri);

  mongoose.connection.on('connected', () => {
    console.log('💾 MongoDB connected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB error:', err);
  });
};

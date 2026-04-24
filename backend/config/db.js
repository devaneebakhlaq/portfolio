const mongoose = require('mongoose');

function getMongoUri() {
  if (process.env.MONGO_URI) {
    return process.env.MONGO_URI;
  }

  const username = process.env.MONGO_USERNAME;
  const password = process.env.MONGO_PASSWORD;
  const host = process.env.MONGO_HOST;
  const dbName = process.env.MONGO_DB_NAME || 'portfolio_db';
  const options = process.env.MONGO_OPTIONS || 'retryWrites=true&w=majority';

  if (username && password && host) {
    const encodedUser = encodeURIComponent(username);
    const encodedPass = encodeURIComponent(password);
    return `mongodb+srv://${encodedUser}:${encodedPass}@${host}/${dbName}?${options}`;
  }

  return 'mongodb://localhost:27017/portfolio_db';
}

async function connectDB() {
  const mongoUri = getMongoUri();

  mongoose.set('strictQuery', true);

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log('✅ MongoDB Connected');
}

module.exports = { connectDB };

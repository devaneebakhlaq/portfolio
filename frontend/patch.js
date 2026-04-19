const fs = require('fs');
const code = fs.readFileSync('../backend/server.js', 'utf8');

const newCode = code.replace(
`// DB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_db')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => { console.error('❌ MongoDB Error:', err.message); process.exit(1); });`,
`// DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_db');
    console.log('✅ MongoDB Connected');
  } catch (err) {
    if (err.message.includes('ECONNREFUSED') || err.message.includes('failed to connect')) {
      console.warn('⚠️ Local MongoDB not found! Falling back to in-memory database for testing...');
      try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        console.log('✅ In-Memory MongoDB Connected (All data will be lost on restart)');
      } catch (memErr) {
        console.error('❌ In-Memory MongoDB Error:', memErr.message);
        process.exit(1);
      }
    } else {
      console.error('❌ MongoDB Error:', err.message);
      process.exit(1);
    }
  }
};
connectDB();`
);

fs.writeFileSync('../backend/server.js', newCode);
console.log('Patched server.js successfully');

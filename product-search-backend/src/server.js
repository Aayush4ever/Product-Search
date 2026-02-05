require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/product.routes');
const searchRoutes = require('./routes/search.routes');

connectDB();

const app = express();
app.use(express.json());

app.use('/api/v1', productRoutes);
app.use('/api/v1', searchRoutes);

app.get('/health', (_, res) => res.send('OK'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

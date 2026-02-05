const express = require('express');
const productRoutes = require('./routes/product.routes');
const searchRoutes = require('./routes/search.routes');

const app = express();
app.use(express.json());

app.use('/api/v1', productRoutes);
app.use('/api/v1', searchRoutes);

app.get('/health', (req, res) => {
  res.send('Server running');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let items = [];

// GET /items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST /items
app.post('/items', (req, res) => {
  const item = req.body;
  if (!item || Object.keys(item).length === 0) {
    return res.status(400).json({ error: 'Item data required' });
  }
  items.push(item);
  res.status(201).json(item);
});

app.listen(port, () => {
  console.log(`REST API server running at http://localhost:${port}`);
});

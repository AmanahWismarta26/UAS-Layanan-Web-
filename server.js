const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Simulasi data
let items = [{ id: 1, name: 'Item 1' }];

// GET
app.get('/items', (req, res) => {
  res.json(items);
});

// POST
app.post('/items', (req, res) => {
  const newItem = { id: items.length + 1, name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  if (item) {
    item.name = req.body.name;
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// DELETE
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Item not found');
  }
});

// PATCH
app.patch('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  if (item) {
    item.name = req.body.name || item.name;
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// HEAD
app.head('/items', (req, res) => {
  res.status(200).send();
});

// OPTIONS
app.options('/items', (req, res) => {
  res.set('Allow', 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS').send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

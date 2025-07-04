const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const headlines = [
  "Why Cake & Co is Mumbai's Sweetest Spot in 2025",
  "Discover the Secret Behind Cake & Co's 5-Star Treats",
  "How Cake & Co is Changing Mumbai’s Dessert Scene",
  "Cake & Co: Where Mumbai Celebrates Every Bite",
];

app.post('/business-data', (req, res) => {
  const { name, location } = req.body;
  res.json({
    rating: (4 + Math.random()).toFixed(1),
    reviews: Math.floor(50 + Math.random() * 200),
    headline: headlines[Math.floor(Math.random() * headlines.length)],
  });
});

app.get('/regenerate-headline', (req, res) => {
  const headline = headlines[Math.floor(Math.random() * headlines.length)];
  res.json({ headline });
});

app.listen(3000, () => console.log('Server running on port 3000'));


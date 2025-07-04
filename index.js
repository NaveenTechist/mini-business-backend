const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const headlines = [
  "Why Cake & Co is Mumbai's Sweetest Spot in 2025",
  "Discover the Secret Behind Cake & Co's 5-Star Treats",
  "How Cake & Co is Changing Mumbai’s Dessert Scene",
  "Cake & Co: Where Mumbai Celebrates Every Bite"
]

// 🔥 Store the latest submitted name/location
let storedHeaders = {
  name: "Cake & Co",
  location: "Mumbai"
}

// ✅ 1. GET /business-data → Returns 25 Fake Business Cards
app.get('/business-data', (req, res) => {
  const businesses = []

  for (let i = 0; i < 25; i++) {
    businesses.push({
      name: `${storedHeaders.name} #${i + 1}`,
      location: storedHeaders.location,
      rating: (4 + Math.random()).toFixed(1),
      reviews: Math.floor(50 + Math.random() * 200),
      headline: headlines[Math.floor(Math.random() * headlines.length)]
    })
  }

  res.json(businesses)
})

// ✅ 2. POST /business-data → Submit Name + Location
app.post('/business-data', (req, res) => {
  const { name, location } = req.body
  storedHeaders.name = name
  storedHeaders.location = location

  res.json({ message: 'Headers updated', name, location })
})

// ✅ 3. GET /headers → Returns Latest Business Name + Location
app.get('/headers', (req, res) => {
  res.json(storedHeaders)
})

// ✅ 4. GET /rating-info → Returns Random Rating + Review Count
app.get('/rating-info', (req, res) => {
  res.json({
    rating: (4 + Math.random()).toFixed(1),
    reviews: Math.floor(50 + Math.random() * 200)
  })
})

// ✅ 5. GET /regenerate-headline → Returns Random Headline
app.get('/regenerate-headline', (req, res) => {
  const headline = headlines[Math.floor(Math.random() * headlines.length)]
  res.json({ headline })
})

app.listen(3000, () => console.log('🔥 Backend running on http://localhost:3000'))

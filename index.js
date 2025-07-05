const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const sampleLocations = [
  "Mumbai", "Delhi", "Hyderabad", "Bangalore", "Chennai",
  "Pune", "Ahmedabad", "Kolkata", "Jaipur", "Surat",
  "Lucknow", "Bhopal", "Indore", "Nagpur", "Patna"
]

const sampleHeadlines = [
  "Revolutionizing Flavors in",
  "Top Rated in",
  "Best Loved by Locals in",
  "The Buzzing Dessert Scene of",
  "Why Everyone Talks About Treats from"
]

const sampleBusinessNames = [
  "Choco Haven", "Sweet Cravings", "Bake & Bite", "The Dessert Spot",
  "Frosty Bliss", "Cupcake Castle", "Treat Street", "Sugar Rush",
  "Berry Bites", "Cookie Corner", "Cocoa Craze", "Heavenly Layers",
  "Whipped Wonders", "Slice of Joy", "Brownie Base"
]

let cachedBusinesses = []

// ✅ 1. GET /business-data → Returns 25 random business cards
app.get('/business-data', (req, res) => {
  const businesses = []

  for (let i = 0; i < 25; i++) {
    const name = sampleBusinessNames[Math.floor(Math.random() * sampleBusinessNames.length)]
    const location = sampleLocations[Math.floor(Math.random() * sampleLocations.length)]
    const rating = (4 + Math.random()).toFixed(1)
    const reviews = Math.floor(50 + Math.random() * 200)
    const headline = `${sampleHeadlines[Math.floor(Math.random() * sampleHeadlines.length)]} ${location}`

    businesses.push({
      id: `${i + 1}`,
      name,
      location,
      rating,
      reviews,
      headline
    })
  }

  cachedBusinesses = businesses
  res.json(businesses)
})

// ✅ 2. GET /regenerate-headline/:id → Regenerates only headline for specific ID
app.get('/regenerate-headline/:id', (req, res) => {
  const { id } = req.params
  const index = cachedBusinesses.findIndex(b => b.id === id)
  if (index === -1) {
    return res.status(404).json({ error: 'Business not found' })
  }
  const location = cachedBusinesses[index].location
  const headline = `${sampleHeadlines[Math.floor(Math.random() * sampleHeadlines.length)]} ${location}`
  cachedBusinesses[index].headline = headline
  res.json({ id, headline })
})

app.listen(3000, () => console.log('🔥 Backend running on http://localhost:3000'))

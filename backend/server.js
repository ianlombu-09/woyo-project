const { match } = require('assert')
const express = require('express')
const app = express()

const products = require('./data/products')

app.get('/', (req, res) => {
    res.send('API is Running')
})

app.get('/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id)
    res.json(product)
})

const PORT = 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))


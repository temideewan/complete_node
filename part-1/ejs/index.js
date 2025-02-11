const express = require('express')
const path = require('path')

const app = express()

// set view engine as ejs
app.set('view engine', 'ejs')


// set the directory as the views folder
app.set('views', path.join(__dirname, 'views'))

const products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  { id: 3, name: 'Product 3', price: 300 },
]

app.get('/', (req,res) => {
  res.render('home', {title: 'Home', products})
})

app.get('/about', (req,res) => {
  res.render('about', {title: 'About page'})
})


const port = 3000;
app.listen(port, () => {
  console.log('Server is running on port 3000...')
})

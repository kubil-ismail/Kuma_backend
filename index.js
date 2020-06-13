require('dotenv').config()
// const { APP_PORT } = process.env
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const resData = require('./src/helper/response')
const serverless = require('serverless-http')

// CORS All
app.use(cors())

// Allowed Url Origins
// const allowedOrigins = ['http://127.0.0.1:500']

// app.use(cors({
//   origin: function (origin, callback) {
//     // (like mobile apps or curl requests)
//     if (!origin) return callback(null, true); if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not ' +
//         'allow access from the specified Origin.'
//       return callback(new Error(msg), false)
//     } return callback(null, true)
//   }
// }))

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// Set static folder root
app.use('/.netlify/book/cover/', express.static('public/assets/cover'))
app.use('/.netlify/profile/cover/', express.static('public/assets/profile'))

// Import Routes
const home = require('./src/routes/index')
const auth = require('./src/routes/api/authRoutes')
const books = require('./src/routes/api/book/bookRoutes')
const authorBooks = require('./src/routes/api/book/authorRoutes')
const genreBooks = require('./src/routes/api/book/genreRoutes')
const reviewBooks = require('./src/routes/api/book/reviewRoutes')
const favoriteBooks = require('./src/routes/api/book/favoriteRoutes')
const profileUser = require('./src/routes/api/user/profileRoutes')
const sosmedUser = require('./src/routes/api/user/sosmedRoutes')

app.use('/.netlify/', home) // Home Route
app.use('/.netlify/auth', auth) // Auth Route

app.use('/.netlify/author', authorBooks) // Book Authors Route
app.use('/.netlify/book', books) // Books Route
app.use('/.netlify/genre', genreBooks) // Book Genres Route
app.use('/.netlify/review', reviewBooks) // Book Reviews Route
app.use('/.netlify/favorite', favoriteBooks) // Book Reviews Route

app.use('/.netlify/profile', profileUser) // Profile User Route
app.use('/.netlify/sosmed', sosmedUser) // Sosmed User Route

// Error Route
app.get('*', (req, res) => {
  res.status(404).send(resData(
    false, 'Page not found'
  ))
})

module.exports.handler = serverless(app)
// app.listen(APP_PORT || 8000, () => {
//   console.log('Server run on port 3000')
// })

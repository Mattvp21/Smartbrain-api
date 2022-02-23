const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const { response } = require('express')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const app = express();
app.use(bodyParser.json())
app.use(cors())
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'mvp',
      password : '',
      database : 'smart-brain'
    }
  });

db.select('*').from('users').then(data => {
   
})







app.get('/', (req, res) => {
    res.send('Success')
})
app.post('/register', (req, res) => { 
    register.handleRegister(req, res, db, bcrypt)
})

app.post('/signin',(req, res) => {
    signin.handleSignIn(req,res,db,bcrypt)
})

app.get('/profile/:id', (req, res) => {
    profile.handleProfile(req, res, db)
})

app.put('/image', (req, res) => {
    image.handleImage(req, res, db)
})

app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res)
})



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

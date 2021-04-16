const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const DB_URL = process.env.DB_URL
const DB_NAME = process.env.DB_NAME
const PORT = process.env.PORT || 3000
// Create a new ObjectID
var objectId = new ObjectID();
// Verify that the hex string is 24 characters long


var db, collection;


app.listen(PORT, () => {
    MongoClient.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(DB_NAME);
        console.log("Connected to `" + DB_NAME + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {

  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
console.log('fluff')
  db.collection('messages').insertOne(
    {activity: req.body.activity,
    isCompleted: false,
    _id: req.body._id },
    (err, result) => {

    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/messages', (req, res) => {
  console.log(req.body.isCompleted)
  console.log('heart')
  db.collection('messages')
  .findOneAndUpdate({ _id: ObjectID(`${req.body._id}`)}, {
    $set: {
      isCompleted: true

    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/cross', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({activity: req.body.activity}, {
    $set: {
    activity: req.body.activity

    }

  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/messages', (req, res) => {
  db.collection('messages').deleteMany({ isCompleted: true}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

app.delete('/clear', (req, res) => {
  db.collection('messages').deleteMany({}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

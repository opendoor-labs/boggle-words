'use strict'

let _ = require('lodash')
let fs = require('fs')
let express = require('express')
let wordListPath = require('word-list')

let allWords = fs.readFileSync(wordListPath, 'utf8').split('\n')
let app = express()
let port = process.env.PORT || 3000

app.listen(port)
console.log('API server started on port: ' + port)

app.get('/', (req,res) => {
 res.sendfile(__dirname + '/index.html');
})

app.route('/:word').get((req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  let word = req.params.word
  if (word.length >= 3 && _.includes(allWords, word)) {
    res.json({ valid: true })
  } else {
    res.json({ valid: false })
  }
})

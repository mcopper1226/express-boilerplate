import { json, urlencoded } from 'body-parser'
import cors from 'cors'

const express = require('express')

const app = express()

const dotenv = require('dotenv')

dotenv.config()

const port = process.env.PORT || 8080

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello world!')
})

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`REST API on http://localhost:${port}`)
    })
  } catch (e) {
    console.error(e)
  }
}

start()

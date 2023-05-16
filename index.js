const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

//! Midelware
app.use(cors())
app.use(express.json())


//todo: main route
app.get('/', (req,res)=>{
  res.send('Ema Jhon server is running..............')
})

app.listen(port, ()=>{
  console.log(`ema jhon server is running on ${port}`);
})

const express = require('express')
const issues = require('./core/issues')
const leaves = require('./core/leaves')

const cors = require('cors')

const PORT = process.env.PORT || 5000

express()
  .use(cors())
  .get('/', (req, res) =>   
  res.send('Hello World!'))

  .get('/api/issues',async (req, res) => {
    const data = await issues.issues();
    res.status(200).send(data);    
  } 
  )

  .get('/api/leaves',async (req, res) => {
    const data = await leaves.leaves();
    res.status(200).send(data);    
  } 
  )

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  


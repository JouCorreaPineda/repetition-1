const express = require('express');
const app = express();
const cors = require('cors')
const {Client} = require('pg');
const config = require('./config')[process.env.NODE_ENV||'dev'];

const client = new Client({
  connectionString: config.connectionString
});

const port = config.port;

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
});

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
  res.send('welcome user');
});

app.get('/:id',(req,res)=>{
  client.query(`SELECT * FROM gentlemen WHERE id=${req.params.id}`)
  .then(result=>{
    res.send(result.rows)
  })
  .catch(err=>{
    console.error(e.stack)
  })
});

app.post('/',(req,res)=>{
  const user = req.body
  const name = user.name
  const age = user.name
  client.query(`INSERT INTO gentlemen (name,age) VALUES ("${name}","${age}") RETURNING *`)
  .then(result=>
    res.send(result.rows)
  )
  .catch(e=>
    console.error(e.stack)
  );
});

app.delete('/:id', (req,res)=>{
  client.query(`DELETE FROM gentlemen WHERE id=${req.params.id}`)
  .then(result=>{
    res.send(result.rows)})
   .catch(e=>{
    console.error(e.stack)
   })
});

app.listen(port,()=>{
  console.log(`listening on port: ${port}`)
});
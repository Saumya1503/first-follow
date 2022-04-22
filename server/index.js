const express = require('express')
const cors = require('cors')
const {spawn} = require("child_process");

const app = express()
const port = process.env.PORT || 5000
const PY_SCRIPT_PATH = `${process.cwd()}/first_follow.py`;

app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json({
    type: ['application/json', 'text/plain']
  }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/calculate', (req, res) => {
    console.log("''''''Got the Request''''''")

    try {

      const process = spawn('python3', [
          PY_SCRIPT_PATH,
          req.body.count_nt,
          req.body.nts,
          req.body.count_t,
          req.body.ts,
          req.body.count_p,
          req.body.ps,
          req.body.start
      ]);

      var msg;

      process.stdout.on('data', (data ) => {

          console.log("Success Data", data.toString());

          msg = data.toString()

          console.log(msg) 

          res.send({msg:msg})

      });

      process.stderr.on('data', (data) => {

          console.log("Error Data", data.toString()); 
          
          res.send({err:data.toString()})

      });

      process.on('close', (code) => {

          console.log(`processed closed with code ${code}`);

        
      });         
      
    } catch (err) {

      console.log(err)
      res.send({err:"Error"});
      
    }



  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
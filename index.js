require('dotenv').config()
const {PORT} = process.env
const app = require('./src/app.js')

app.listen(PORT, ()=>{
  console.log(`Server listening on port: ${PORT}`);
})
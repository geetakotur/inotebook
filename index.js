const connectToMongo=require('./db'); //importing db
const express = require('express') //importing express
const cors=require('cors');

connectToMongo(); //calling fun
const app = express()
const port = 5000

app.use(cors())
app.use(express.json());//to reflect json

//available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port,() => {
  console.log(`iNoteBook app listening at http://localhost:${port}`)
})

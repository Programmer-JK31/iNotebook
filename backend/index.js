const connectToMongo = require('./db.js');
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/api/auth' , require('./routes/auth.js'));
app.use('/api/notes' , require('./routes/notes.js'));

app.listen(port, ()=>{
    console.log(`iNotebook backend is listening at http://localhost:${port}`);
});

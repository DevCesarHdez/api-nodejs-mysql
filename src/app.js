const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use('/users',require('./routes/userRoutes'))

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
})

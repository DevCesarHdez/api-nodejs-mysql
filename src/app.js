const express = require('express');
const morgan = require('morgan');

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
})

const mongoose = require('mongoose');
const express = require('express');
const users = require('./routes/users');
const app = express();

mongoose.connect("mongodb+srv://admin:admin@clustert-fwz18.mongodb.net/ternium?retryWrites=true", {dbName: 'ternium', useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'+err));

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json());
app.use('/api/users', users);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
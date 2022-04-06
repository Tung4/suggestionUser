var express = require('express'),
  app = express(),
  port = process.env.PORT || 5000,
  // bodyParser = require('body-parser');
  cors = require('cors')

app.use(cors({}))
app.use(express.json())

var routes = require('./api/route/todoListRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Server started on: ' + port);


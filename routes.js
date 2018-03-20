const app = require('express')();
let { collection } = require('./config/database');

let setResponse = {
  ok: (res, data) => {
    return res.json({
      data: data
    });
  },
  error: (res, err) => {
    console.log(err);
    return res.json({
      error: {
        message: err.message
      }
    });
  }
}

app.get('/', (req, res) => {
  collection('errorslog')
    .then(result => setResponse.ok(res, result))
    .catch(err => setResponse.error(res, err));
});

module.exports = app;

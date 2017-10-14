var request = require('request');

request({
  uri: 'https://www.parsehub.com/api/v2/runs/tDTATbEiAWD0',
  method: 'GET',
  qs: {
    api_key: "tBBVHwdbsEeo"
  }
}, function(err, resp, body) {
  console.log(body);
});
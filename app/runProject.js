const http = require('http');
var rp = require('request-promise');
var request = require('request');

request({
  uri: 'https://www.parsehub.com/api/v2/projects/tFGuZstVp7-v/run',
  method: 'POST',
  form: {
    api_key: "tBBVHwdbsEeo",
    start_url: "https://ma.surf-report.com/meteo-surf/maroc/",
    start_template: "main_template"
  }
}, function(err, resp, body) {
  console.log(body);
});
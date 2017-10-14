var request = require('request');
var _ = require('lodash');
const http = require('http');
var jsonInfo;

request({
  uri: 'https://www.parsehub.com/api/v2/projects/tFGuZstVp7-v/last_ready_run/data',
  method: 'GET',
  gzip: true,
  qs: {
    api_key: "tBBVHwdbsEeo",
    format: "json"
  }
}, function(err, resp, body) {
  jsonInfo = JSON.parse(body);

  var cleanedArray = _.map(jsonInfo.spots, function(spot) {
    var cleanedSpot = spot;
  
    cleanedSpot.name = _.replace(spot.name, '\n', ' ');

    return cleanedSpot;
  });
  
  var staticData = [{
    "name": "Casablanca Ain Diab",
    "latitude": 33.586163,
    "longitude": -7.689406
  }];

  var resultingArray = _.unionBy(staticData, jsonInfo.spots, 'name');
  console.log(resultingArray);

});


//exports.jsonInfo = jsonInfo;


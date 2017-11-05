var rp = require('request-promise');
var runFile = require('./runProject');

var runInfo = runFile.runObject;
var runToken = runInfo.run_token;

var getRun = {
  uri: 'https://www.parsehub.com/api/v2/runs/' + runToken,
  method: 'GET',
  qs: {
    api_key: "tBBVHwdbsEeo"
  }
};
rp(getRun)
.then(function(body){
  console.log(body);
})
.catch(function(err) {
  console.log("Did not work");
});
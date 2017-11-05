const http = require('http');
var request = require('request');
var waterfall = require('async-waterfall');
var rp = require('request-promise');
var fs = require('fs');

var getProjectInfo = {
  uri: 'https://www.parsehub.com/api/v2/projects/tFGuZstVp7-v/run',
  method: 'POST',
  form: {
    api_key: "tBBVHwdbsEeo",
    start_url: "https://ma.surf-report.com/meteo-surf/maroc/",
    start_template: "main_template"
  }
};
var getRunInfo = {
  uri: 'https://www.parsehub.com/api/v2/runs/',
  method: 'GET',
  qs: {
    api_key: "tBBVHwdbsEeo"
  }
};
var getData = {
  uri: 'https://www.parsehub.com/api/v2/projects/tFGuZstVp7-v/last_ready_run/data',
  method: 'GET',
  gzip: true,
  qs: {
    api_key: "tBBVHwdbsEeo",
    format: "json"
  }
};

waterfall([
  function(callback) {
    request(getProjectInfo,function(err,res,body){
      callback(null,body);
    });
  },
  function(projectInfo, callback) {
      var projectInfo2 = JSON.parse(projectInfo);
      var runToken = projectInfo2["run_token"];
      getRunInfo.uri += runToken;
      console.log(getRunInfo);
      var runInfo;
      var timer = 30000;
      var times = 0;
      var setTimer = function(){
        times++;
        if(times > 8){
          timer = 200000
        }
      }
      var checkDataReady = setInterval(function(){ 
          rp(getRunInfo)
          .then(function(body){
            runInfo = JSON.parse(body);
            if(runInfo["data_ready"] == true){
              clearInterval(checkDataReady);
              callback(null);
            }  
          })
          .catch(function(err) {
            console.log("error: not working");
          });
          setTimer();
        }, timer);
      },
  function(callback) {
        request(getData,function(err,res,body){
          callback(null,body);
        });
  },
  function(dataHere,callback){
    fs.writeFile(process.cwd() + "/app/server/static/previsions.json", dataHere, "utf8", function(error) {
      if (error) {
          console.log(error);
      }
  });
  callback(null,"It worked!");
  }
], function (err, result) {
  if(!err)
  {
    console.log(result);
    require('./makeAvailable');
  }
});


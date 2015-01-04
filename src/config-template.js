var config = {
  dataEndpoint: "",
  apiKey: ""
};

config.getEndpoint = function(){
  return this.dataEndpoint + this.apiKey;
};

module.exports = config;
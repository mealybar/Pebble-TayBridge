var ajax = require('ajax');
var config = require('config');

var dataStore = {
  endpoint: config.getEndpoint(),
  store: [],
  loadFailCallback: function(m){},
  loadSuccessCallback: function(){}
};

dataStore.load = function() {
  ajax(
    {
      url: this.endpoint,
      type: 'json'
    },
    function(data) {
      if(data.status !== 0) {
        console.log('Failed to fetch data: endpoint error: ' + data.message);
        dataStore.loadFailCallback('Failed to load data - API error.');
        return;
      }

      dataStore.store.push({
        label: "Cars & Single Decker Buses",
        isOpen: data.payload['Cars & Single Decker Buses'] == "open",
        updated: data.modified
      });
      dataStore.store.push({
        label: "Cyclists & Pedestrians",
        isOpen: data.payload['Cyclists & Pedestrians'] == "open",
        updated: data.modified
      });
      dataStore.store.push({
        label: "Double Decker Buses",
        isOpen: data.payload['Double Decker Buses'] == "open",
        updated: data.modified
      });
      dataStore.store.push({
        label: "High Sided Vehicles",
        isOpen: data.payload['High Sided Vehicles'] == "open",
        updated: data.modified
      });

      dataStore.loadSuccessCallback();
    },
    function(error) {
      console.log('Failed to fetch data: ajax error: ' + error);
      dataStore.loadFailCallback('Network error. Is there a network connection?');
    }
  );
};

dataStore.setLoadFailCallback = function(callback) {
  this.loadFailCallback = callback;
};
dataStore.setLoadSuccessCallback = function(callback) {
  this.loadSuccessCallback = callback;
};

dataStore.getItemForKey = function(key){
  for (var i = 0; i < this.store.length; i++) {
    if (this.store[i].label === key) {
      return this.store[i];
    }
  }
  return {label: "not found", isOpen: false, updated: "n/a"};
};
//wrap foreach so private is not exposed
dataStore.forEach = function(callback) {
  dataStore.store.forEach(callback);
};

module.exports = dataStore;
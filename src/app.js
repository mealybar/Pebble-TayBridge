var UI = require('ui');

var App = {
  dataStore: null,
  statusMenu: null,
  detailsScreen: require('detailsscreen')
};

App.showLoadingScreen = function() {
  App.detailsScreen.setTitle('Tay Bridge Open?');
  App.detailsScreen.setStatus('Loading...');
  App.detailsScreen.showWindow();
};
App.showLoadingScreen();

App.init = function() {
  App.load();
};

App.load = function() {
  App.dataStore = require('datastore');
  App.dataStore.setLoadFailCallback(function(message) {
    App.detailsScreen.setDetails(message);
  });
  App.dataStore.setLoadSuccessCallback(function(message){
    App.loadMenu();
  });
  App.dataStore.load();
};

App.loadMenu = function() {
  var statusMenuData = [];
  App.dataStore.forEach(function(item) {
    statusMenuData.push({
      title: item.label,
      subtitle: App.getStatusStringForValue(item.isOpen)
    });
  });

  App.statusMenu = new UI.Menu({
    sections: [{
      title: 'Tay Bridge Open?',
      items: statusMenuData
    }]
  });

  App.statusMenu.show();
  App.detailsScreen.hideWindow();

  App.statusMenu.on('select', function(e) {
    var data = App.dataStore.getItemForKey(e.item.title),
        updated = new Date(Date.parse(data.updated)),
        updatedString = '';
    
    updatedString += ("0" + updated.getUTCHours()).slice(-2) + ":" + ("0" + updated.getUTCMinutes()).slice(-2);
    updatedString += " " + updated.getUTCDate() + "/" + (updated.getUTCMonth()+1) + "/" + updated.getUTCFullYear();

    App.detailsScreen.setTitle(data.label);
    App.detailsScreen.setStatus(App.getStatusStringForValue(data.isOpen));
    App.detailsScreen.setDetails('Last updated: ' + updatedString);

    App.detailsScreen.showWindow();
    App.statusMenu.hide();
  });

  App.detailsScreen.setBackCallback(function() {
    App.statusMenu.show();
  });
};

App.getStatusStringForValue = function(isOpen) {
  return isOpen ? "Open" : "Closed";
};

App.init();

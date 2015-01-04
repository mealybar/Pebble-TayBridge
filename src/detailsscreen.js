var UI = require('ui');
var Vector2 = require('vector2');

var detailsScreen = {
  private: {
    window: null,
    background: null,
    title: null,
    status: null,
    details: null,
    backPressCallback: function(){}
  }
};

detailsScreen.private.init = function (){
  this.window = new UI.Window(); //is 144 x 168 pixels

  this.background = new UI.Rect({
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    backgroundColor: 'white'
  });
  this.window.add(this.background);

  this.title = new UI.Text({
    position: new Vector2(2, -5),
    size: new Vector2(142, 60),
    text: '',
    font: 'gothic-28-bold',
    color: 'black',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    backgroundColor: 'clear'
  });
  this.window.add(this.title);

  this.status = new UI.Text({
    position: new Vector2(2, 52),
    size: new Vector2(142, 74),
    text: '',
    font: 'gothic-24',
    color: 'black',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    backgroundColor: 'clear'
  });
  this.window.add(this.status);

  this.details = new UI.Text({
    position: new Vector2(2, 80),
    size: new Vector2(142, 88),
    text: '',
    font: 'gothic-18',
    color: 'black',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    backgroundColor: 'clear'
  });
  this.window.add(this.details);

  this.window.on('click', 'back', function() {
    detailsScreen.private.backPressCallback();
    detailsScreen.hideWindow();
  });
};

//public
detailsScreen.init = function (){
  this.private.init();
};
detailsScreen.hideWindow = function (){
    this.private.window.hide();
  };
detailsScreen.showWindow = function (){
    this.private.window.show();
};
detailsScreen.setBackCallback = function(callback){
    this.private.backPressCallback = callback;
};
detailsScreen.setTitle = function(text){
    this.private.title.text(text);
};
detailsScreen.setStatus = function(text){
    this.private.status.text(text);
};
detailsScreen.setDetails = function(text){
    this.private.details.text(text);
};

//initialise
detailsScreen.init();

module.exports = detailsScreen;
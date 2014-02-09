(function(window, document, undefined) {

  var client = new IM.Client();
  client.init();
  client.connect('http://127.0.0.1:9000/');
  client.joinWithName('sds' + Math.random());
  client.sendMessage("sdsd" + +Math.random());
})(window, document);
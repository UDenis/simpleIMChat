(function(window, document) {

  var server = new IM.Server(),
    serverView;

  serverView = {
    logs: ko.observableArray(),

    addLog: function(data) {
      var date = new Date();
      data.time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      this.logs.splice(0, 0, data);
    }
  };

  server.init();

  server.on("connect", function() {
    serverView.addLog({
      text: "Соеденился участник",
      cssClass: "success"
    });
  });

  server.on("join", function(ev, data) {
    serverView.addLog({
      text: "Участник назвался как " + data.name,
      cssClass: "success"
    });
  });

  server.on("message", function(ev, data) {
    var client = server.getClient(ev.source);
    serverView.addLog({
      text: client.name + " пишет:" + data.message,
      cssClass: ""
    });
  });

  ko.applyBindings(serverView, document.getElementById('logTable'));

})(window, document)
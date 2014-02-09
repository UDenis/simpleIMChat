(function(window, document) {

  var server = new IM.Server(),
    serverView;

  serverView = {
    logs: ko.observableArray()
  };

  server.init();

  server.on("connect", function() {
    serverView.logs.push({
      text: "Соеденился участник",
      cssClass: "success"
    });
  });

  server.on("join", function(ev, data) {
    serverView.logs.push({
      text: "Участник назвался как " + data.name,
      cssClass: "success"
    });
  });

  server.on("message", function(ev, data) {
    serverView.logs.push({
      text: "Пришло сообщени",
      cssClass: ""
    });
  });

  ko.applyBindings(serverView, document.getElementById('logTable'));

})(window, document)
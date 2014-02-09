(function(window) {

  function Server() {
    this.clients = [];
  };

  Server.prototype = new IM.Service();

  Server.prototype.getMessageHandlers = function() {
    var onConnect,
      onJoin,
      onMessage;

    onConnect = function(event, data) {
      this.clients.push({
        source: event.source,
        name: ""
      });
      return "URA";
    };

    onJoin = function(event, data) {

    };

    onMessage = function(event, data) {

    }

    return {
      connect: onConnect,
      join: onJoin,
      onMessage: onMessage
    }
  };

  Server.prototype._sendMsg = function(msg, clients) {
    var self = this;

    clients = clients || this.clients;
    IM.Array.each(clients, function(i, client) {
      self.getTransporter().send({
        method: "message",
        data: {
          message: msg
        }
      }, client);
    });
  };

  window.IM.Server = Server;

})(window);
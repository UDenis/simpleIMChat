(function(window) {

  function Server() {
    this.clients = [];
    this.idPropName = Math.random();
  };

  Server.prototype = new IM.Service();

  Server.prototype.getMessageHandlers = function() {
    var onConnect,
      onJoin,
      onMessage;

    onConnect = function(event, data) {
      var source = event.source;
      this.clients.push({
        source: source,
        name: ""
      });
      source[this.idPropName] = this.clients.length - 1;
    };

    onJoin = function(event, data) {
      var source = event.source;
      this.clients[source[this.idPropName]].name = data.name;
    };

    onMessage = function(event, data) {
      var clients = [];
      IM.Array.each(this.clients, function(i, cl) {
        if (cl != event.source)
          clients.push(cl);
      });
      this._sendMsg(data.message, clients);
    };

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
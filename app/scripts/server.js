(function(window) {

  function Server() {
    this.clients = [];
    this.messagesStorageName = 'IM.Messages';
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
    };

    onJoin = function(event, data) {
      var source = event.source,
        self = this,
        client;

      client = this.clients.filter(function(cl) {
        return cl.source === source;
      });

      client[0] && (client[0].name = data.name);

      this.getTransporter().send({
        method: "initdata",
        data: {
          users: this.clients.filter(function(u) {
            return !!u.name;
          }).map(function(u) {
            return u.name;
          })
        }
      }, source);


      this.filteredClients(event.source).forEach(function(cl) {
        self.getTransporter().send({
          method: "joined",
          data: {
            user: data.name
          }
        }, cl.source);
      });
    };

    onMessage = function(event, data) {
      var source = event.source,
        length = this.clients.length,
        i = 0;

      this._sendMsg(data.message, this.getClient(event.source), this.filteredClients(event.source));

      this.storageMsg({
        message: data.message,
        from: data.name,
        time: new Date()
      });
    };

    return {
      connect: onConnect,
      join: onJoin,
      message: onMessage
    }
  };

  Server.prototype.storageMsg = function(data) {
    messagesStorage = this.getHistory();
    messagesStorage.messages.push(data);
    sessionStorage.setItem(this.messagesStorageName, JSON.stringify(messagesStorage));
  };

  Server.prototype.getHistory = function() {
    messagesStorage = JSON.parse(sessionStorage.getItem(this.messagesStorageName) || null);
    messagesStorage = messagesStorage || {};
    messagesStorage.messages = messagesStorage.messages || [];
    return messagesStorage;
  }

  Server.prototype._sendMsg = function(msg, from, clients) {
    var self = this;

    clients = clients || this.clients;
    clients.forEach(function(client) {
      self.getTransporter().send({
        method: "message",
        data: {
          message: msg,
          name: from.name,
        }
      }, client.source);
    });
  };

  Server.prototype.getClient = function(source) {
    var i = 0,
      length = this.clients.length;
    for (; i < length; i++) {
      if (this.clients[i].source === source)
        return this.clients[i];
    };
  };

  Server.prototype.filteredClients = function(source) {
    var i = 0,
      length = this.clients.length,
      clients = [];

    for (; i < length; i++) {
      if (this.clients[i].source !== source)
        clients.push(this.clients[i]);
    };

    return clients;
  };

  window.IM.Server = Server;

})(window);
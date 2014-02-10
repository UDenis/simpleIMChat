(function(window) {


  function Client() {
    this.users = [];
    this.messagesStorageName = 'IM.Messages';
  };

  Client.prototype = new IM.Service();

  Client.prototype.getMessageHandlers = function(first_argument) {

    var onMessage = function(ev, data) {
      this.storageMsg({
        message: data.message,
        from: data.name,
        time: new Date()
      });
    },

      onInitdata = function(ev, data) {
        this.addUsers(data.users);
      },

      onJoined = function(ev, data) {
        this.addUsers([data.user]);
      };


    return {
      message: onMessage,
      initdata: onInitdata,
      joined: onJoined
    };

  };

  Client.prototype.addUsers = function(users) {
    var self = this;
    users.forEach(function(u) {
      self.users.push(u);
    });
  };

  Client.prototype.storageMsg = function(data) {
    messagesStorage = this.getHistory();
    messagesStorage.messages.push(data);
    sessionStorage.setItem(this.messagesStorageName, JSON.stringify(messagesStorage));
  };

  Client.prototype.getHistory = function() {
    messagesStorage = JSON.parse(sessionStorage.getItem(this.messagesStorageName) || null);
    messagesStorage = messagesStorage || {};
    messagesStorage.messages = messagesStorage.messages || [];
    return messagesStorage;
  }

  Client.prototype._send = function(data) {
    return this.getTransporter().send(data, this.address);
  };

  Client.prototype.connect = function(address) {
    this.address = address;
    return this._send({
      method: "connect"
    });
  };

  Client.prototype.joinWithName = function(name) {
    this._send({
      method: "join",
      data: {
        name: name
      }
    });
  };

  Client.prototype.sendMessage = function(msg) {
    this._send({
      method: "message",
      data: {
        message: msg
      }
    })
  };

  window.IM.Client = Client;

})(window);
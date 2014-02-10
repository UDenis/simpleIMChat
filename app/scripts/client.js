(function(window) {


  function Client() {
    this.users = [];
    this.messagesStorageName = 'IM.Messages';
  };

  Client.prototype = new IM.Service();

  Client.prototype.getMessageHandlers = function(first_argument) {

    var onInitdata,
      onJoined;

    onInitdata = function(ev, data) {
      this.addUsers(data.users);
    };

    onJoined = function(ev, data) {
      this.addUsers([data.user]);
    };

    return {
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
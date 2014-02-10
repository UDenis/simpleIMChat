(function(window) {

  function Service() {
    this._subscribers = {};
  };

  Service.prototype.init = function() {
    var self = this,
      onMessageHandlers = this.getMessageHandlers();

    this.getTransporter().onMessage(function(event) {
      var method = event.data.method;
      onMessageHandlers[method] && onMessageHandlers[method].call(self, event, event.data.data);
      self._publish(method, event, event.data.data)
    });
  };

  Service.prototype.getTransporter = function() {
    return this.__transporter = this.__transporter || new IM.Transport();
  };

  Service.prototype.getMessageHandlers = function() {
    throw "getMessageHandlers is abstract";
  };

  Service.prototype.on = function(type, fn) {
    var self = this;
    this._subscribers[type] = this._subscribers[type] || [];
    this._subscribers[type].push(fn);

    return {
      off: function() {
        self.off(type, fn);
      }
    }
  };

  Service.prototype.off = function(callBackOrEventName, callback) {
    var eventName,
      _subscribers;

    if (IM.isString(callBackOrEventName)) {
      eventName = callBackOrEventName;

      if (!(_subscribers = this._subscribers[eventName])) return;

      if (isFunction(callback)) {
        IM.Array.removeItem(_subscribers, callback);
      } else { // clear all
        this._subscribers[eventName] = [];
      }

    } else if (IM.isFunction(callBackOrEventName)) {
      callback = callBackOrEventName;
      for (eventName in this._subscribers) {
        this.off(eventName, callback);
      };
    }
  };

  Service.prototype._publish = function(type, ev, data) {
    var _subscribers = this._subscribers[type] || [],
      length = _subscribers.length,
      i = 0;

    _subscribers.forEach(function(handler) {
      handler(ev, data);
    });
  };

  window.IM.Service = Service;

})(window);
(function(window) {

  var addListener;

  if (window.addEventListener) {
    addListener = function(listener) {
      window.addEventListener("message", listener, false);
    }
  } else {
    addListener = function(listener) {
      window.attachEvent("message", listener);
    }
  }

  function Transport() {};

  Transport.prototype.send = function(data, address) {
    if (IM.isString(address))
      return window.parent.postMessage(data, address);
    else
      return address.postMessage(data, "*");
  };

  Transport.prototype.onMessage = function(callback) {
    addListener(callback);
  };

  window.IM.Transport = Transport;
})(window);
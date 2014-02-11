(function(window) {

  window.IM.isFunction = function(value) {
    return typeof value === 'function';
  };

  window.IM.isString = function(value) {
    return typeof value === 'string';
  };

  window.IM.Array = {

    removeItem: function(array, item) {
      var length = array.length,
        i = 0;

      for (; i < length; i++) {
        if (array[i] === item) {
          array.splice(i, 1);
          i--;
          length--;
        }
      }
    }
  };

})(window);
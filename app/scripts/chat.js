(function(window, document, undefined) {

  var client = new IM.Client(),
    chatMsgsList = document.getElementById('chatMsgsList'),
    clientViewModel,
    serverUrl;

  try {
    serverUrl = parent.location.origin || '*';
  } catch (ex) {
    serverUrl = '*';
  }

  function ClientViewModel() {

    this.smileCodes = {
      ':)': {
        cssClass: 'smile',
        regex: ':\\)'
      },

      '))': {
        cssClass: 'smile',
        regex: '\\)\\)'
      },

      ':-)': {
        cssClass: 'smile',
        regex: ':-\\)'
      },

      ':=)': {
        cssClass: 'smile',
        regex: ':=\\)'
      },

      ':(': {
        cssClass: 'sad',
        regex: ':\\('
      },

      '((': {
        cssClass: 'sad',
        regex: '\\(\\('
      },

      ':-(': {
        cssClass: 'sad',
        regex: ':-\\('
      },

      ':=(': {
        cssClass: 'sad',
        regex: ':=\\('
      },

      ':D': {
        cssClass: 'laugh',
        regex: ':D'
      },

      ':=D': {
        cssClass: 'laugh',
        regex: ':D'
      },

      ';)': {
        cssClass: 'wink',
        regex: ';\\)'
      },

      ';-)': {
        cssClass: 'wink',
        regex: ';-\\)'
      },

      ';=)': {
        cssClass: 'wink',
        regex: ';=\\)'
      },

      ':-|': {
        cssClass: 'speechless',
        regex: ':-\\|'
      },

      ':|': {
        cssClass: 'speechless',
        regex: ':\\|'
      },
      ':=|': {
        cssClass: 'speechless',
        regex: ':=\\|'
      }
    };

    this.message = ko.observable();

    this.name = ko.observable();

    this.isJoined = ko.observable(false);

    this.messages = ko.observableArray();

    this.isNotJoined = ko.computed(function() {
      return !this.isJoined();
    }, this);
  };

  ClientViewModel.prototype.addMessage = function(data) {
    var date = data.time || new Date();
    data.time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    data.message = this.formatMsg(data.message);

    this.messages.push(data);

    if (chatMsgsList.children.length > 0) {
      chatMsgsList.children[chatMsgsList.children.length - 1].scrollIntoView(true);
    }
  };

  ClientViewModel.prototype.formatMsg = function(msg) {
    return this.formatSmiles(this.formatNames(msg));
  };

  // коды смайлов преобразуем в смайлики
  ClientViewModel.prototype.formatSmiles = function(msg) {
    var smiles = this.smileCodes,
      regexStr = "",
      keys = Object.keys(smiles),
      length = keys.length,
      i = -1,
      regExp;

    keys.forEach(function(sm) {
      regexStr += smiles[sm].regex;
      i++;
      if (i < length - 1)
        regexStr += "|";
    });

    regExp = new RegExp("\s*" + regexStr + "\s*", "img");
    msg = msg.replace(regExp, function(code, u, offset, s) {
      return "<span class='smileicon " + smiles[code].cssClass + " '></span>";
    });
    return msg;
  };

  // Встречающиеся именя выделяем жирным
  ClientViewModel.prototype.formatNames = function(msg) {

    if (!client.users.length)
      return msg;

    var users = client.users,
      regexStr = "",
      length = users.length,
      i = -1,
      regExp;

    users.forEach(function(u) {
      regexStr += u;
      i++;
      if (i < length - 1)
        regexStr += "|";
    });

    regExp = new RegExp("\s*" + regexStr + "\s*", "img");
    msg = msg.replace(regExp, function(str, u, offset, s) {
      return "<b>" + str + "</b>";
    });
    return msg;
  };

  ClientViewModel.prototype.sendMsg = function() {
    var msg = this.message();
    if (msg) {
      client.sendMessage(msg);
      this.message("");
      this.addMessage({
        message: msg,
        name: "Я",
        cssClass: 'text - primary'
      });
    }
  };

  ClientViewModel.prototype.join = function() {
    var name = this.name();
    if (name) {
      client.joinWithName(name);
      clientViewModel.isJoined(true);
    }
  };

  clientViewModel = new ClientViewModel();
  client.init();
  client.connect(serverUrl);

  client.on('message', function(ev, data) {
    clientViewModel.addMessage({
      message: data.message,
      name: data.name,
      cssClass: 'text-primary'
    });
  });

  client.on('joined', function(ev, data) {
    clientViewModel.addMessage({
      message: "К нам присоеденился " + data.user,
      name: "",
      cssClass: 'text-info'
    });
  });

  ko.applyBindings(clientViewModel, document.getElementById('chat'));

})(window, document);
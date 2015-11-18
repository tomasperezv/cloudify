var Command = require('./command'),
  Core = require('../core'),
  config = require('../config');

var SSH = function() {
  Command.apply(this);
};

SSH.prototype = new Command();

/**
 * @method toString
 * @param {Array} args
 * @return {String}
 * @public
 */
SSH.prototype.toString = function(args) {

  var host = args[2];
  var username = config.username;
  for (var i = 0; i < config.hosts.length; i++) {
    var currentHost = config.hosts[i];
    if (currentHost.id === host) {
      host = currentHost.name + '.' + currentHost.domain;
      if (typeof currentHost.username !== 'undefined') {
        username = currentHost.username;
      }
      break;
    }
  }

  return 'ssh -A ' + Core.getHost(username, host);
};

module.exports = SSH;

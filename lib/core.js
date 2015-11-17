/* jslint node: true, esnext: true */
var Config = require('./config');

/**
 * @object Core
 */
var Core = {

  /**
   * @method getHostname
   * @param {Object} ConfigEntry
   */
  getHostname(ConfigEntry) {
    var hostname = ConfigEntry.name;

    if (typeof ConfigEntry.project !== 'undefined') {
      hostname += '.' + ConfigEntry.project;
    } else if (typeof ConfigEntry.site !== 'undefined') {
      hostname += '.' + ConfigEntry.domain;
    }

    return hostname;
  },

  /**
   * @method getJumpHost
   * @return {String}
   */
  getJumpHost() {
    return this.getHost(Config.jumphost);
  },

  /**
   * @method getHost
   * @param {Object} config
   * @return {String}
   * @public
   */
  getHost(config) {
    return config.username + '@' + config.name + '.' + config.domain;
  },

  /**
   * @method getEntry
   * @param {String} host
   * @return {String}
   */
  getEntry(host) {

    var data = null;
    for (var i = 0; i < Config.hosts.length; i++) {
      var entry = Config.hosts[i];
      if (entry.name === host) {
        data = entry;
        break;
      }
    }

    return data;
  },

  /**
   * @param {String} hostname
   * @param {Boolean} jump
   * @return {String}
   * @method getCommand
   */
  getCommand(hostname, jump) {

    if (typeof jump === 'undefined') {
      jump = false;
    }

    var shellSyntaxCommand = 'ssh -A -t ' + Config.username + '@' + hostname;

    if (jump) {
      shellSyntaxCommand = 'ssh -A -t ' + Config.username + '@' + this.getJumpHost() + ' ' + shellSyntaxCommand;
    }

    return shellSyntaxCommand;
  }

};

module.exports = Core;

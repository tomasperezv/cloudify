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
    var hostname = ConfigEntry.name + '.';

    if (typeof ConfigEntry.project !== 'undefined') {
      hostname += ConfigEntry.project;
    } else if (typeof ConfigEntry.site !== 'undefined') {
      hostname += ConfigEntry.domain;
    }

    return hostname;
  },

  /**
   * @method getJumpHost
   * @return {String}
   */
  getJumpHost() {
    return this.getHost(Config.jumphost.username, Config.jumphost.name + '.' + Config.jumphost.domain);
  },

  /**
   * @method getHost
   * @param {String} username
   * @param {String} hostname
   * @return {String}
   * @public
   */
  getHost(username, hostname) {
    return username + '@' + hostname;
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
  }

};

module.exports = Core;

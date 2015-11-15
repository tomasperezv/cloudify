/* jslint node: true, esnext: true */
var Config = require('./config'),
  log = require('./log');

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
    return Config.jumphost.name + '.' + Config.jumphost.domain;
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
  },

  /**
   * @method run
   * @param {String} command
   * @param {String} jump
   * @public
   */
  run(command, jump) {

    if (typeof jump === 'undefined') {
      jump = false;
    }

    var host = command;
    var data = this.getEntry(host);

    if (data !== null) {
      var spawn = require('child_process').spawn;
      var hostname = this.getHostname(data);
      var shellSyntaxCommand = this.getCommand(hostname, jump);
      log(shellSyntaxCommand);
      spawn('sh', ['-c', shellSyntaxCommand], { stdio: 'inherit' });
    }
  }

};

module.exports = Core;

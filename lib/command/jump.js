/* jslint node: true */
var Command = require('./command'),
  config = require('../config');

var Jump = function() {
  Command.apply(this);
};

Jump.prototype = new Command();

/**
 * @return {String}
 * @param {Array} args
 * @method toString
 * @public
 */
Jump.prototype.toString = function(args) {
  var SSH = require('./ssh');
  var ssh = new SSH();
  args.splice(2, 1);
  var suffix = ssh.toString(args);

  var hostConfig = config.jumphost;
  return 'ssh -A -t ' +
    hostConfig.username + '@' +
    hostConfig.name + '.' +
    config.jumphost.domain + ' ' +
    suffix;
};

module.exports = Jump;

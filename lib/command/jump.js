/* jslint node: true */
var Command = require('./command'),
  Core = require('../core');

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

  return 'ssh -A -t ' +
    Core.getJumpHost() + ' ' +
    suffix;
};

module.exports = Jump;

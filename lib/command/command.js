/* jslint node: true */
var log = require('../log'),
  spawn = require('child_process').spawn;

/**
 * @constructor
 */
var Command = function() {
};

/**
 * @method toString
 * @param {Array} args
 * @return {String}
 * @public
 */
Command.prototype.toString = function() {
};

/**
 * @method run
 */
Command.prototype.run = function(args) {
  var shellCommand = this.toString(args);
  log(shellCommand);
  spawn('sh', ['-c', shellCommand], { stdio: 'inherit' });
};

module.exports = Command;

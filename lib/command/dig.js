/* jslint node: true */

var Command = require('./command'),
  log = require('../log');

var Dig = function() {
  Command.apply(this);
};

Dig.prototype = new Command();

/**
 * @method toString
 * @param {Array} args
 * @return {String}
 * @public
 */
Dig.prototype.toString = function(args) {
  log('[PRIORITY]: 0-65535, lowest is highest priority');
  log('[WEIGHT]: 0-65535, used when more than one service with same priority');
  log('[WEIGHT] [PRIORITY] [PORT]');

  return 'dig +short -t srv ' + args[3];
};

module.exports = Dig;

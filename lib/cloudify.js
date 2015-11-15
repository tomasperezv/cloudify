/* jslint node: true */
var log = require('./log');

var Cloudify = function() {
};

/**
 * @method processCommand
 * @param {Object} args
 */
Cloudify.prototype.processCommand = function(args) {

  // Fallback to the list command
  var command = 'list';
  if (args.length > 1) {
    command = args[2];
    try {
      var runner = require('./command/' + command);
      runner.run(args);
    } catch (e) {
      log('ERROR: command ' + command + ' not available');
    }
  }

};

module.exports = Cloudify;

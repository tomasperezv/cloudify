/* jslint node: true */
var log = require('./log');

var Cloudify = function() {
};

/**
 * @method processCommand
 * @param {Object} args
 */
Cloudify.prototype.processCommand = function(args) {

  try {
    require('./config');

    // Set first the default command
    var command = 'list';
    if (args.length > 2) {
      command = args[2];
    }

    try {
      // Include the module associated with the command and run it
      var Runner = require('./command/' + command);
      var runner = new Runner();
      runner.run(args);
    } catch (e) {
      log('ERROR: command ' + command + ' not available');
    }

  } catch (e) {
    log('ERROR: configuration file is missing.');
  }

};

module.exports = Cloudify;

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
      var Command = require('./command/' + command);
      var commandRunner = new Command();
      commandRunner.run(args);
    } catch (e) {
      // The command is not available, we will try to determine if
      // we are trying to connect to a host i.e. "cloudify web"
      var SSH = require('./command/ssh');
      var ssh = new SSH();
      ssh.run(args);
    }

  } catch (e) {
    log('ERROR: configuration file is missing.');
  }

};

module.exports = Cloudify;

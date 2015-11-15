var Command = require('./command'),
  Core = require('../core'),
  config = require('../config'),
  log = require('../log');

var List = function() {
  Command.apply(this);
};

List.prototype = new Command();

/**
 * @method list
 * @public
 */
List.prototype.run = function() {

  var result = config.hosts.map(function(current) {
    return current.name + ' => ' + Core.getHostname(current);
  });

  log(result);
};

module.exports = List;

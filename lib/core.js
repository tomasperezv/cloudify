/**
 * @method getHostname
 * @param {Object} configEntry
 */
var getHostname = function(configEntry) {
  var hostname = configEntry.name;

  if (typeof configEntry.project !== 'undefined') {
    hostname += '.' + configEntry.project;
  } else if (typeof configEntry.site !== 'undefined') {
    hostname += '.' + configEntry.domain;
  }

  return hostname;
};

/**
 * @method getJumpHost
 */
var getJumpHost = function() {
  return config.jumphost.name + '.' + config.jumphost.domain;
};

/**
 * @method zjump
 * @param {String} host
 */
exports.zjump = function(host) {
  var spawn = require('child_process').spawn;
  var shellSyntaxCommand = getCommand(host, true);
  console.log(shellSyntaxCommand);
  spawn('sh', ['-c', shellSyntaxCommand], { stdio: 'inherit' });
};

/**
 * @method getEntry
 * @param {String} host
 */
var getEntry = function(host) {

  var data = null;
  for (var i = 0; i < config.hosts.length; i++) {
    var entry = config.hosts[i];
    if (entry.name === host) {
      data = entry;
      break;
    }
  }

  return data;
};

/**
 * @param {String} hostname
 * @param {Boolean} jump
 * @method getCommand
 * @return {String}
 */
var getCommand = function(hostname, jump) {

  if (typeof jump === 'undefined') {
    jump = false;
  }

  var shellSyntaxCommand = 'ssh -A -t ' + config.username + '@' + hostname;

  if (jump) {
    shellSyntaxCommand = 'ssh -A -t ' + config.username + '@' + getJumpHost() + ' ' + shellSyntaxCommand;
  }

  return shellSyntaxCommand;
};

/**
 * @method list
 * @public
 */
exports.list = function() {
  var result = config.hosts.map(function(current) {
    return current.name + ' => ' + getHostname(current);
  });

  console.log(result);
  console.log(config['srv-records']);
};

/**
 * @method dig
 * @public
 */
exports.dig = function(command) {
  if (typeof config['srv-records'][command] === 'undefined') {
    console.log(config, command);
    return;
  }

  var host = command;
  var data = config['srv-records'][command];

  if (data !== null) {
    var spawn = require('child_process').spawn;
    var hostname = config.jumphost.name + '.' + config.jumphost.domain;
    var shellSyntaxCommand = 'ssh -A -t ' + config.username + '@' + hostname + ' "dig +short -t srv ' + data + '"';
    console.log(shellSyntaxCommand);
    console.log('[PRIORITY]: 0-65535, lowest is highest priority');
    console.log('[WEIGHT]: 0-65535, used when more than one service with same priority');
    console.log('[WEIGHT] [PRIORITY] [PORT]');
    spawn('sh', ['-c', shellSyntaxCommand], { stdio: 'inherit' });
  }
};

/**
 * @method run
 * @param {String} command
 * @param {String} jump
 * @public
 */
exports.run = function(command, jump) {

  if (typeof jump === 'undefined') {
    jump = false;
  }

  var host = command;
  var data = getEntry(host);

  if (data !== null) {
    var spawn = require('child_process').spawn;
    var hostname = getHostname(data);
    var shellSyntaxCommand = getCommand(hostname, jump);
    console.log(shellSyntaxCommand);
    spawn('sh', ['-c', shellSyntaxCommand], { stdio: 'inherit' });
  }
};

/**
 * @method getHome
 * @public
 */
function getHome() {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

/**
 * @method geConfing
 */
function getConfig() {
  var config = null;
  try {
    config = require(getHome() + '/.cloudify.json');
  } catch (e) {
    console.log('Error: ./config/config.json not found');
    return -1;
  }

  return config;
}

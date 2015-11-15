/**
 * @method dig
 * @param {String} command
 * @public
 */
dig(command) {
  if (typeof Config['srv-records'][command] === 'undefined') {
    log(Config, command);
    return;
  }

  var data = Config['srv-records'][command];

  if (data !== null) {
    var spawn = require('child_process').spawn;
    var hostname = Config.jumphost.name + '.' + Config.jumphost.domain;
    var shellSyntaxCommand = 'ssh -A -t ' + Config.username + '@' + hostname + ' "dig +short -t srv ' + data + '"';
    log(shellSyntaxCommand);
    log('[PRIORITY]: 0-65535, lowest is highest priority');
    log('[WEIGHT]: 0-65535, used when more than one service with same priority');
    log('[WEIGHT] [PRIORITY] [PORT]');
    spawn('sh', ['-c', shellSyntaxCommand], { stdio: 'inherit' });
  }
}

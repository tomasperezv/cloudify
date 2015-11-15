/**
 * @method zjump
 * @param {String} host
 */
zjump(host) {
  var spawn = require('child_process').spawn;
  var shellSyntaxCommand = this.getCommand(host, true);
  log(shellSyntaxCommand);
  spawn('sh', ['-c', shellSyntaxCommand], { stdio: 'inherit' });
}

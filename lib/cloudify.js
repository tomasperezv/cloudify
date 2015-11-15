var config = getConfig();

var Cloudify = function() {
};

/**
 * @method processCommand
 * @param {Object} args
 */
Cloudify.prototype.processCommand = function(args) {

  if (typeof args[2] !== 'undefined') {
    var argument = args[2];
    switch (argument) {

      case 'dig':
        core.dig(args[3]);
        break;

      case 'list':
        core.list();
        break;

      case 'jump':
        if (typeof args[3] !== 'undefined') {
          core.run(args[3], true);
        }
        break;

      case 'zjump':
        if (typeof args[3] !== 'undefined') {
          core.zjump(args[3]);
        }
        break;

      default:
        core.run(args[2]);
        break;
    }
  } else {
    core.list();
  }
};

module.exports = Cloudify;

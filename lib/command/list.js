/**
 * @method list
 * @public
 */
list() {
  var result = Config.hosts.map(function(current) {
    return current.name + ' => ' + this.getHostname(current);
  });

  log(result);
  log(Config['srv-records']);
}

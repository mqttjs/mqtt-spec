var specs = require('./specs');
var factory = require('./support/factory');

module.exports = {
  port: 1883,
  host: 'localhost',
  speed: 1,
  setup: function(options){
    if(options.port) this.port = options.port;
    if(options.host) this.host = options.host;
    factory.setup(this.port, this.host);
  },
  registerMochaTests: function(){
    Object.keys(specs).forEach(function(mod){
      var list = specs[mod];
      describe(list.name, function(){
        list.tests.forEach(function(test){
          it(test.name, test.method);
        });
      });
    });
  }
};

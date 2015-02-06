var net = require('net');
var mqttConn = require('mqtt-connection');
var mqtt = require('mqtt');
var crypto = require('crypto');

module.exports = {
  setup: function(port, host) {
    this.port = port;
    this.host = host;
  },
  c: function(){
    return 'spec_' + crypto.randomBytes(8).toString('hex');
  },
  m: function(){
    return Math.floor(65535 * Math.random());
  },
  t: function(){
    return '/topic_' + crypto.randomBytes(8).toString('hex');
  },
  p: function(){
    return 'payload-' + crypto.randomBytes(8).toString('hex');
  },
  client: function(options, handler, done){
    if(typeof options == 'function') {
      done = handler;
      handler = options;
      options = {};
    }

    if(!options.clientId) {
      options.clientId = this.c()
    }

    var c = mqtt.connect('mqtt://' + this.host + ':' + this.port, options);

    if(handler) {
      c.once('connect', function(){
        handler(c);
      });
    }

    c.on('error', function(){});

    if(done) {
      c.stream.once('close', function(){
        setTimeout(done, 0);
      });
    }

    return c;
  },
  rawClient: function(handler, done) {
    var self = this;
    var c = net.createConnection(this.port, this.host, function(){
      handler(mqttConn(c), {
        clientId: self.c(),
        protocolId: 'MQTT',
        protocolVersion: 4
      });

      c.on('error', function(){});

      if(done) {
        c.once('close', function(){
          setTimeout(done, 0);
        });
      }
    });
    return c;
  },
  countDone: function(count, done) {
    return function() {
      count--;
      if(count === 0) {
        done();
      }
    };
  }
};

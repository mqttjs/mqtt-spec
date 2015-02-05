var expect = require('expect.js');
var async = require('async');

var f = require('../support/factory');
var List = require('../support/list');

/**
 * Session related tests, that test storing a client state, eg. subscriptions and messages.
 */
var list = new List('Session');

list.addTest('should restore subscriptions for uncleaned clients', function(done) {
  var cid = f.c();
  var t = f.t();
  var p = f.p();
  async.series([
    function(cb) {
      f.client({
        clientId: cid,
        clean: false
      }, function(client){
        client.subscribe(t, { qos: 1 }, function(){
          client.end();
        });
      }, cb);
    },
    function(cb) {
      f.client({
        clientId: cid,
        clean: false
      }, function(client){
        client.on('message', function(topic, payload, packet){
          expect(topic).to.be.eql(t);
          expect(payload.toString()).to.be.eql(p);
          expect(packet.qos).to.be.eql(1);
          client.end();
        });
        client.publish(t, p, { qos: 1 });
      }, cb);
    }
  ], done);
});

module.exports = list;

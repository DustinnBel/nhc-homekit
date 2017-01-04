const HomeControlClient = require('nhc-client').HomeControlClient;
const init = require('hap-nodejs').init;
var HomeControlBridge = require('./HomeControlBridge');
var AccessoryFactory = require('./AccessoryFactory');

'use strict';

module.exports = function() {
  init();

  var bridge = new HomeControlBridge();
  var client = new HomeControlClient();

  client.on('connect', function() {
    client.listActions(function(actions) {
      actions.forEach(function(action) {
        try {
          bridge.addBridgedAccessory(
            AccessoryFactory.createAccessoryFromAction(action)
          );
        } catch (error) {
          console.log(error);
        }
      });

      bridge.publish({
          username: "CC:22:3D:E3:CE:30",
          port: 51826,
          pincode: '031-45-154'
      });
    });
  });

  client.connect();
}

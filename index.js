"use strict";

const { logger, settings } = require("./globals");

const mqtt = require("./mqtt");

var devices = {};

function assertDeviceData(id) {
  if (!devices[id]) {
    devices[id] = {};
  }
}

function mqtt_listener(topic, message) {
  logger.debug(`${topic}: ${JSON.stringify(message)}`);
  var mac = message.mac;
  assertDeviceData(mac);
  if (topic.endsWith("info")) {
    devices[mac].info = message;
  } else if (topic.endsWith("announce")) {
    devices[mac].announce = message;
  }
  if (devices[mac].info && devices[mac].announce) {
    logger.debug(
      `Device ${mac} has both info and announce. Create the discovery message.`
    );
  }
}

mqtt.setListener(mqtt_listener);

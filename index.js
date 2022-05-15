"use strict";

const { logger, settings } = require("./globals");

const mqtt = require("./mqtt");

const discovery = require("./discovery");

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
  if (topic.endsWith("announce")) {
    devices[mac].announce = message;
  } else if (topic.endsWith("info")) {
    devices[mac].info = message;
  }
  if (devices[mac].announce && devices[mac].info) {
    discovery(devices[mac].announce, devices[mac].info);
  }
}

mqtt.setListener(mqtt_listener);

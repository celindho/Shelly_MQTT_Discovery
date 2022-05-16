"use strict";

const { logger, settings } = require("./globals");

const mqtt = require("./mqtt");

const discovery = require("./discovery");

var devices = {};

function mqtt_listener(topic, message) {
  logger.debug(`${topic}: ${JSON.stringify(message)}`);
  var mac = message.mac;
  if (topic.endsWith("announce")) {
    discovery(message);
    devices[mac] = message.id;
  }
  if (topic.endsWith("info")) {
    var id = devices[mac];
  }
}

mqtt.setListener(mqtt_listener);

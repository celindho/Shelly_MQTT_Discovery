"use strict";

const { logger, settings } = require("./globals");

const mqtt = require("./mqtt");

function mqtt_listener(topic, message) {
  logger.debug(`${topic}: ${message}`);
}

mqtt.setListener(mqtt_listener);

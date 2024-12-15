"use strict";
const mqtt = require("mqtt");

const { logger, settings } = require("./globals");

var mqtt_client;

var listener;

function setListener(new_listener) {
  listener = new_listener;
}

function publish(topic, message, options) {
  logger.debug(
    `Publish on ${topic} ${options?.retain ? "[R]" : ""}: ${JSON.stringify(
      message
    )}`
  );
  mqtt_client.publish(topic, message, options);
}

function publishRetain(topic, message) {
  publish(topic, message, { retain: true });
}

function subscribe(topic) {
  mqtt_client.subscribe(topic, function (err) {
    if (!err) {
      logger.debug(`Successfully subscribed to "${topic}".`);
    } else {
      logger.error(`Error subscribing to "${topic}".`);
    }
  });
}

function createMqttClient(mqtt_host, mqtt_port) {
  if (!mqtt_client) {
    logger.info("MQTT connecting to %s:%d.", mqtt_host, mqtt_port);
    mqtt_client = mqtt.connect({
      host: mqtt_host,
      port: mqtt_port,
      connectTimeout: 60 * 1000,
      clientId: "shellydiscovery_" + Math.floor(Math.random() * 1000),
    });
    mqtt_client.on("connect", () => {
      logger.info("MQTT connected to. %s:%d.", mqtt_host, mqtt_port);
      subscribe("shellies/announce");
      subscribe("shellies/+/info");
    });
    mqtt_client.on("error", (e) => {
      logger.error("MQTT Error, exiting program: ", e.message);
      process.exit(1);
    });
    mqtt_client.on("message", function (topic, payload) {
      if (listener) {
        listener(topic, JSON.parse(payload.toString()));
      } else {
        logger.warning(
          `No listener for MQTT message on ${topic}: "${payload}".`
        );
      }
    });
  }
}

createMqttClient(settings.mqtt_host, settings.mqtt_port);

module.exports = {
  publish: publish,
  publishRetain: publishRetain,
  setListener: setListener,
};

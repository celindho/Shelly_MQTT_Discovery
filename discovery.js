"use strict";

const { logger, settings } = require("./globals");

const mqtt = require("./mqtt");

const deviceSettings = require("./devicesettings");

function getSensorsByDevice(device, deviceId) {
  if (!device || !device.model) {
    return [];
  } else {
    var getSensors = require("./models/" + device.model);
    if (getSensors) {
      return getSensors(device, deviceId);
    } else {
      return [];
    }
  }
}

function createDiscoveryMessage(announceBody) {
  if (!settings.hass_autodiscovery_disable) {
    var mac = announceBody.mac;
    var deviceId = announceBody.id;

    const device = {
      connections: [
        ["mqtt", `shellies/${deviceId}/`],
        ["ip", announceBody.ip],
        ["mac", mac],
      ],
      identifiers: [`Shelly ${deviceId}`],
      manufacturer: "Shelly",
      model: deviceSettings.getModelByMac(mac, announceBody.model),
      name: deviceSettings.getNameByMac(mac),
      sw_version: announceBody.fw_ver,
      configuration_url: `http://${announceBody.ip}`,
    };

    var suggestedArea = deviceSettings.getAreaByMac(mac);
    if (suggestedArea) device.suggested_area = suggestedArea;

    var sensors = getSensorsByDevice(device, deviceId);

    sensors.forEach((entity) => {
      var discoveryTopic = `${settings.hass_autodiscovery_topic_prefix}/sensor/shelly_${entity.object_id}/config`;
      mqtt.publishRetain(discoveryTopic, JSON.stringify(entity));
    });
  }
}

module.exports = createDiscoveryMessage;

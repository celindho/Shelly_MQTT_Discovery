"use strict";

const { logger, settings } = require("./globals");

const mqtt = require("./mqtt");

const deviceSettings = require("./devicesettings");

function createDiscoveryMessage(announceBody, infoBody) {
  if (!settings.hass_autodiscovery_disable) {
    var mac = announceBody.mac;

    const device = {
      connections: [
        ["mqtt", `shellies/${announceBody.id}/`],
        ["ip", announceBody.ip],
        ["mac", mac],
      ],
      identifiers: [`Shelly ${announceBody.id}`],
      manufacturer: "Shelly",
      model: announceBody.model,
      name: deviceSettings.getNameByMac(mac),
      sw_version: announceBody.fw_ver,
      configuration_url: `http://${announceBody.ip}`,
    };

    var suggestedArea = deviceSettings.getAreaByMac(mac);
    if (suggestedArea) device.suggested_area = suggestedArea;

    var sensors = [];
    for (let phase = 1; phase <= 3; phase++) {
      sensors.push({
        device: device,
        name: `${device.name} L${phase} Voltage`,
        object_id: `${announceBody.id}_l${phase}_voltage`,
        unique_id: `sensor_mqtt_shelly_${mac}_l${phase}_voltage`,
        state_topic: `shellies/${announceBody.id}/emeter/${phase - 1}/voltage`,
        state_class: "measurement",
        unitOfMeasurement: "V",
        device_class: "voltage",
        expire_after: 5 * 60,
      });
      sensors.push({
        device: device,
        name: `${device.name} L${phase} Current`,
        object_id: `${announceBody.id}_l${phase}_current`,
        unique_id: `sensor_mqtt_shelly_${mac}_l${phase}_current`,
        state_topic: `shellies/${announceBody.id}/emeter/${phase - 1}/current`,
        state_class: "measurement",
        unitOfMeasurement: "A",
        device_class: "current",
        expire_after: 5 * 60,
      });
      sensors.push({
        device: device,
        name: `${device.name} L${phase} Power`,
        object_id: `${announceBody.id}_l${phase}_power`,
        unique_id: `sensor_mqtt_shelly_${mac}_l${phase}_power`,
        state_topic: `shellies/${announceBody.id}/emeter/${phase - 1}/power`,
        state_class: "measurement",
        unitOfMeasurement: "W",
        device_class: "power",
        expire_after: 5 * 60,
      });
      sensors.push({
        device: device,
        name: `${device.name} L${phase} Power Factor`,
        object_id: `${announceBody.id}_l${phase}_power_factor`,
        unique_id: `sensor_mqtt_shelly_${mac}_l${phase}_power_factor`,
        state_topic: `shellies/${announceBody.id}/emeter/${
          phase - 1
        }/power_factor`,
        state_class: "measurement",
        unitOfMeasurement: "%",
        device_class: "power_factor",
        expire_after: 5 * 60,
      });
      sensors.push({
        device: device,
        name: `${device.name} L${phase} Power Factor`,
        object_id: `${announceBody.id}_l${phase}_power_factor`,
        unique_id: `sensor_mqtt_shelly_${mac}_l${phase}_power_factor`,
        state_topic: `shellies/${announceBody.id}/emeter/${phase - 1}/pf`,
        state_class: "measurement",
        unitOfMeasurement: "%",
        device_class: "power_factor",
        expire_after: 5 * 60,
      });
      sensors.push({
        device: device,
        name: `${device.name} L${phase} Total Energy`,
        object_id: `${announceBody.id}_l${phase}_total_energy`,
        unique_id: `sensor_mqtt_shelly_${mac}_l${phase}_total_energy`,
        state_topic: `shellies/${announceBody.id}/emeter/${phase - 1}/total`,
        state_class: "total_increasing",
        unitOfMeasurement: "kWh",
        device_class: "energy",
        expire_after: 5 * 60,
      });
      sensors.push({
        device: device,
        name: `${device.name} L${phase} Total Energy Returned`,
        object_id: `${announceBody.id}_l${phase}_total_energy_returned`,
        unique_id: `sensor_mqtt_shelly_${mac}_l${phase}_total_energy_returned`,
        state_topic: `shellies/${announceBody.id}/emeter/${
          phase - 1
        }/total_returned`,
        state_class: "total_increasing",
        unitOfMeasurement: "kWh",
        device_class: "energy",
        expire_after: 5 * 60,
      });
    }

    sensors.forEach((entity) => {
      var discoveryTopic = `${settings.hass_autodiscovery_topic_prefix}/sensor/shelly_${entity.object_id}/config`;
      mqtt.publishRetain(discoveryTopic, JSON.stringify(entity));
    });
  }
}

module.exports = createDiscoveryMessage;

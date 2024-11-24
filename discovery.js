"use strict";

const { logger, settings } = require("./globals");

const mqtt = require("./mqtt");

const deviceSettings = require("./devicesettings");

function getEntitiesByDevice(device, mac, deviceId) {
  logger.debug(`Getting entities for '${deviceId}'`);
  if (!device || !device.model) {
    logger.debug(`No device defined for '${deviceId}'`);
    return [];
  } else {
    logger.debug(`Getting definitions for model ${device.model}'`);
    var getEntities = require("./models/" + device.model);
    if (getEntities) {
      var entities = getEntities(device, mac, deviceId);
      logger.debug(
        `${entities.sensor?.length || 0} sensors, ${entities.light?.length || 0
        } ligths and ${entities.switch?.length || 0} switches for '${deviceId}'`
      );
      return entities;
    } else {
      logger.debug(`No model definition for '${device.model}'`);
      return [];
    }
  }
}

function createDiscoveryMessage(announceBody) {
  if (!settings.hass_autodiscovery_disable) {
    var mac = announceBody.mac;
    var deviceId = announceBody.id;

    if (deviceSettings.getIsEnabled(mac)) {

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

      var entities = getEntitiesByDevice(device, mac, deviceId);

      for (const [component, componentEntities] of Object.entries(entities)) {
        logger.debug(
          `${deviceId}.${component}: ${componentEntities.length} entities`
        );
        componentEntities.forEach((entity) => {
          var discoveryTopic = `${settings.hass_autodiscovery_topic_prefix}/${component}/${entity.unique_id}/config`;

          logger.debug(
            `Created  discovery topic '${discoveryTopic}' with message '${JSON.stringify(
              entity
            )}'`
          );
          mqtt.publishRetain(
            discoveryTopic,
            entity.nullAsMessage ? null : JSON.stringify(entity)
          );
        });
      }
    }
  }
}

module.exports = createDiscoveryMessage;

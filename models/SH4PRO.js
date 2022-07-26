const deviceSettings = require("../devicesettings");

const removeAccents = require("remove-accents");

function getEscapedString(string) {
  return removeAccents(string)
    .toLowerCase()
    .replace(/[^a-z ]/g, "")
    .replace(/ +/g, "_");
}

function getEntities(device, mac, deviceId) {
  var entities = { sensor: [], light: [], switch: [] };

  var customization = deviceSettings.getCustomizationByMac(mac, device.model);

  for (let output = 1; output <= 4; output++) {
    var customizeRelay = customization.relay[output];

    var entityName = customizeRelay.name || `${device.name} Relay ${output}`;
    var escapedName = getEscapedString(entityName);

    var switchOrLight = customizeRelay.showAsLight ? "light" : "switch";
    var switchOrLightToClear = customizeRelay.showAsLight ? "switch" : "light";

    entities[switchOrLight].push({
      device: device,
      name: `${entityName}`,
      object_id: `${escapedName}`,
      unique_id: `${switchOrLight}_mqtt_${deviceId}_relay_${output}`,
      state_topic: `shellies/${deviceId}/relay/${output}`,
      command_topic: `shellies/${deviceId}/relay/${output}/command`,
      payload_on: "on",
      payload_off: "off",
    });
    entities[switchOrLightToClear].push({
      nullAsMessage: true,
      unique_id: `${switchOrLightToClear}_mqtt_${deviceId}_relay_${output}`,
    });
    entities.sensor.push({
      device: device,
      name: `${entityName} Power`,
      object_id: `${escapedName}_power`,
      unique_id: `sensor_mqtt_${deviceId}_relay_${output}_power`,
      state_topic: `shellies/${deviceId}/relay/${output}/power`,
      state_class: "measurement",
      unit_of_measurement: "W",
      device_class: "power",
      expire_after: 5 * 60,
    });
    entities.sensor.push({
      device: device,
      name: `${entityName} Energy`,
      object_id: `${escapedName}_energy`,
      unique_id: `sensor_mqtt_${deviceId}_relay_${output}_energy`,
      state_topic: `shellies/${deviceId}/relay/${output}/energy`,
      state_class: "total_increasing",
      value_template: "{{ ( (value | float) / 60) | round(2, 'floor') }}",
      unit_of_measurement: "Wh",
      device_class: "energy",
    });
  }

  return entities;
}

module.exports = getEntities;

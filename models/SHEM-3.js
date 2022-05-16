function getSensors(device, deviceId) {
  var sensors = [];

  for (let phase = 1; phase <= 3; phase++) {
    sensors.push({
      device: device,
      name: `${device.name} L${phase} Voltage`,
      object_id: `${deviceId}_l${phase}_voltage`,
      unique_id: `sensor_mqtt_${deviceId}_l${phase}_voltage`,
      state_topic: `shellies/${deviceId}/emeter/${phase - 1}/voltage`,
      state_class: "measurement",
      unitOfMeasurement: "V",
      device_class: "voltage",
      expire_after: 5 * 60,
    });
    sensors.push({
      device: device,
      name: `${device.name} L${phase} Current`,
      object_id: `${deviceId}_l${phase}_current`,
      unique_id: `sensor_mqtt_${deviceId}_l${phase}_current`,
      state_topic: `shellies/${deviceId}/emeter/${phase - 1}/current`,
      state_class: "measurement",
      unitOfMeasurement: "A",
      device_class: "current",
      expire_after: 5 * 60,
    });
    sensors.push({
      device: device,
      name: `${device.name} L${phase} Power`,
      object_id: `${deviceId}_l${phase}_power`,
      unique_id: `sensor_mqtt_${deviceId}_l${phase}_power`,
      state_topic: `shellies/${deviceId}/emeter/${phase - 1}/power`,
      state_class: "measurement",
      unitOfMeasurement: "W",
      device_class: "power",
      expire_after: 5 * 60,
    });
    sensors.push({
      device: device,
      name: `${device.name} L${phase} Power Factor`,
      object_id: `${deviceId}_l${phase}_power_factor`,
      unique_id: `sensor_mqtt_${deviceId}_l${phase}_power_factor`,
      state_topic: `shellies/${deviceId}/emeter/${phase - 1}/power_factor`,
      state_class: "measurement",
      unitOfMeasurement: "%",
      device_class: "power_factor",
      expire_after: 5 * 60,
    });
    sensors.push({
      device: device,
      name: `${device.name} L${phase} Energy`,
      object_id: `${deviceId}_l${phase}_energy`,
      unique_id: `sensor_mqtt_${deviceId}_l${phase}_energy`,
      state_topic: `shellies/${deviceId}/emeter/${phase - 1}/energy`,
      state_class: "measurement",
      unitOfMeasurement: "Wmin",
      device_class: "energy",
      expire_after: 5 * 60,
    });
    sensors.push({
      device: device,
      name: `${device.name} L${phase} Returned Energy `,
      object_id: `${deviceId}_l${phase}_returned_energy`,
      unique_id: `sensor_mqtt_${deviceId}_l${phase}_returned_energy`,
      state_topic: `shellies/${deviceId}/emeter/${phase - 1}/returned_energy`,
      state_class: "measurement",
      unitOfMeasurement: "Wmin",
      device_class: "energy",
      expire_after: 5 * 60,
    });
    sensors.push({
      device: device,
      name: `${device.name} L${phase} Power Factor`,
      object_id: `${deviceId}_l${phase}_power_factor`,
      unique_id: `sensor_mqtt_${deviceId}_l${phase}_power_factor`,
      state_topic: `shellies/${deviceId}/emeter/${phase - 1}/pf`,
      state_class: "measurement",
      unitOfMeasurement: "%",
      device_class: "power_factor",
      expire_after: 5 * 60,
    });
    sensors.push({
      device: device,
      name: `${device.name} L${phase} Total Energy`,
      object_id: `${deviceId}_l${phase}_total_energy`,
      unique_id: `sensor_mqtt_${deviceId}_l${phase}_total_energy`,
      state_topic: `shellies/${deviceId}/emeter/${phase - 1}/total`,
      state_class: "total_increasing",
      unitOfMeasurement: "kWh",
      device_class: "energy",
      expire_after: 5 * 60,
    });
    sensors.push({
      device: device,
      name: `${device.name} L${phase} Total Energy Returned`,
      object_id: `${deviceId}_l${phase}_total_energy_returned`,
      unique_id: `sensor_mqtt_${deviceId}_l${phase}_total_energy_returned`,
      state_topic: `shellies/${deviceId}/emeter/${phase - 1}/total_returned`,
      state_class: "total_increasing",
      unitOfMeasurement: "kWh",
      device_class: "energy",
      expire_after: 5 * 60,
    });
  }

  return sensors;
}

module.exports = getSensors;

const { logger, settings } = require("./globals");

const removeAccents = require("remove-accents");

const deviceStore = require("data-store")("shelly", {
  path: settings.config_folder + "/devices.json",
});

function getByMac(mac) {
  if (!deviceStore.has(mac)) {
    deviceStore.set(mac, { name: null, area: null });
    deviceStore.save();
  }
  return deviceStore.get(mac);
}

function getNameByMac(mac) {
  return getByMac(mac).name || `Shelly ${mac}`;
}

function getAreaByMac(mac) {
  return getByMac(mac).area;
}

module.exports = {
  getNameByMac: getNameByMac,
  getAreaByMac: getAreaByMac,
};

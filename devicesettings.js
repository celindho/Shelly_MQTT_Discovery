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

function getModelByMac(mac, defaultValue) {
  if (!deviceStore.has(`${mac}.model`)) {
    deviceStore.set(`${mac}.model`, defaultValue || null);
    deviceStore.save();
  }
  return getByMac(mac).model;
}

function getCustomizationByMac(mac, model) {
  if (!deviceStore.has(`${mac}.customization`)) {
    var defaultCustomization;
    switch (model) {
      case "SH4PRO":
        defaultCustomization = { relay: {} };
        [1, 2, 3, 4].forEach((relayIndex) => {
          defaultCustomization.relay[relayIndex] = {
            name: null,
            showAsLight: false,
          };
        });
        break;
      default:
        break;
    }
    deviceStore.set(`${mac}.customization`, defaultCustomization);
    deviceStore.save();
  }
  return getByMac(mac).customization;
}

module.exports = {
  getNameByMac: getNameByMac,
  getAreaByMac: getAreaByMac,
  getModelByMac: getModelByMac,
  getCustomizationByMac: getCustomizationByMac,
};

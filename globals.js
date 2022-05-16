var settings;

process.env["NODE_CONFIG_DIR"] = getSettings().config_folder;
const config = require("config");

function getConfigValue(property, defaultValue) {
  if (defaultValue && !config.has(property)) {
    return defaultValue;
  } else {
    return config.get(property);
  }
}

function getLogger() {
  const winston = require("winston");
  const { splat, combine, timestamp, printf } = winston.format;

  // meta param is ensured by splat()
  const myFormat = printf(({ timestamp, level, message, meta }) => {
    return `${timestamp};${level};${message};${
      meta ? JSON.stringify(meta) : ""
    }`;
  });

  const logger = winston.createLogger({
    level: getConfigValue("Logger.defaultLevel", "info"),
    format: combine(timestamp(), splat(), myFormat),
    transports: [new winston.transports.Console()],
  });
  return logger;
}

function getSettings() {
  if (!settings) {
    const commandLineArgs = require("command-line-args");

    const argsDefinitions = [
      {
        name: "mqtt_host",
        alias: "h",
        type: String,
        defaultValue: "localhost",
      },
      { name: "mqtt_port", alias: "p", type: Number, defaultValue: 1883 },
      {
        name: "hass_autodiscovery_disable",
        alias: "d",
        type: Boolean,
        defaultValue: false,
      },
      {
        name: "hass_autodiscovery_topic_prefix",
        alias: "x",
        type: String,
        defaultValue: "homeassistant",
      },
      {
        name: "config_folder",
        type: String,
        defaultValue: process.cwd() + "/.config",
      },
    ];

    const args = commandLineArgs(argsDefinitions);

    //override with environment variables if available
    argsDefinitions.forEach((def) => {
      if (process.env[def.name]) {
        args[def.name] = process.env[def.name];
      }
    });

    settings = args;
  }
  return settings;
}

module.exports = {
  logger: getLogger(),
  settings: getSettings(),
};

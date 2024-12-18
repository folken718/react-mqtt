export enum ConnStatus {
  CONNECTING = "Connecting",
  CONNECTED = "Connected",
  RECONNECTING = "Reconnecting",
  ERROR = "Error",
}

export enum SensorTopics {
  TEMPERATURE = "esp/bme680/temperature",
  HUMIDITY = "esp/bme680/humidity",
}

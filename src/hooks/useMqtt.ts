import { useCallback, useEffect, useState } from "react";
import { ErrorStatus, MqttConfig } from "../Interfaces/MqttInterfaces";
import mqtt, { MqttClient } from "mqtt";
import { ConnStatus } from "../Enums/MqttEnums";

export const useMqtt = ({ host, port, topic }: MqttConfig) => {
  const [client, setClient] = useState<MqttClient>();
  const [connectionStatus, setConnectionStatus] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<ErrorStatus>();

  const connect = useCallback(() => {
    const fullHost = port ? `${host}:${port}` : host;
    const mqttClient = mqtt.connect(`ws://${fullHost}`);
    setConnectionStatus(ConnStatus.CONNECTING);
    setClient(mqttClient);
    mqttClient.subscribe(topic);
  }, [host, port, topic]);

  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    if (client) {
      console.log(client);
      client.on("connect", () => {
        setConnectionStatus(ConnStatus.CONNECTED);
      });
      client.on("error", (err) => {
        setConnectionStatus(ConnStatus.ERROR);
        setError({ error: true, errorDetails: err });
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setConnectionStatus(ConnStatus.RECONNECTING);
      });
      client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        setMessage(payload.message);
      });
    }

    return () => {
      client?.end();
    };
  }, [client]);
  return { connectionStatus, message, error };
};

export default useMqtt;

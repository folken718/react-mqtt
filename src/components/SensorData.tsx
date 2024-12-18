import useMqtt from "../hooks/useMqtt";
import { MqttConfig } from "../Interfaces/MqttInterfaces";

const SensorData = ({ host, port, topic, dataLabel }: MqttConfig) => {
  const { connectionStatus, error, message } = useMqtt({
    host,
    port,
    topic,
  });

  return (
    <div>
      <div>{`Connection Status: ${connectionStatus}`}</div>
      {message && <div>{`${dataLabel}: ${message}`}</div>}
      {error?.error && <div>{`Error: ${error.errorDetails.message}`}</div>}
    </div>
  );
};

export default SensorData;

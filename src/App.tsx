import "./App.css";
import LiveHumidityChart from "./components/LiveHumidityChart";
import LiveTemperatureChart from "./components/LiveTemperatureChart";
import { SensorTopics } from "./Enums/MqttEnums";

function App() {
  return (
    <>
      <div>
        <h2>Temperature</h2>
      </div>
      <LiveTemperatureChart
        host="192.168.68.97"
        port="9001"
        topic={SensorTopics.TEMPERATURE}
        dataLabel="Temperature"
      />
      <div>
        <h2>Humidity</h2>
      </div>
      <LiveHumidityChart
        host="192.168.68.97"
        port="9001"
        topic={SensorTopics.HUMIDITY}
        dataLabel="Humidity"
      />
    </>
  );
}

export default App;

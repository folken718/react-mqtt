import GaugeComponent from "react-gauge-component";
import useMqtt from "../hooks/useMqtt";
import { useMemo } from "react";
import { MqttConfig } from "../Interfaces/MqttInterfaces";

function LiveHumidityChart({ host, port, topic }: MqttConfig) {
  const { message } = useMqtt({
    host,
    port,
    topic,
  });

  const chart = useMemo(() => {
    return (
      <GaugeComponent
        type="semicircle"
        arc={{
          width: 0.2,
          padding: 0.005,
          cornerRadius: 1,
          gradient: true,
          subArcs: [
            {
              limit: 25,
              color: "#343deb",
              showTick: true,
              tooltip: {
                text: "Too dry!",
              },
            },
            {
              limit: 50,
              color: "#3495eb",
              showTick: true,
              tooltip: {
                text: "Low temperature!",
              },
            },
            {
              limit: 75,
              color: "#5BE12C",
              showTick: true,
              tooltip: {
                text: "OK temperature!",
              },
            },
            {
              limit: 100,
              color: "#F5CD19",
              showTick: true,
              tooltip: {
                text: "Super Humid!",
              },
            },
          ],
        }}
        pointer={{
          color: "#345243",
          length: 0.8,
          width: 15,
          // elastic: true,
        }}
        labels={{
          valueLabel: { formatTextValue: (value) => value + "%" },
          tickLabels: {
            type: "outer",
            /*
            valueConfig: {
              formatTextValue: (value: string) => value + "ºC",
              fontSize: 10,
            },
            */
            ticks: [],
          },
        }}
        value={message ? Number(message) : 0}
        minValue={0}
        maxValue={100}
      />
    );
  }, [message]);

  return <div>{chart}</div>;
}

export default LiveHumidityChart;

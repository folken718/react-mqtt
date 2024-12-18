import GaugeComponent from "react-gauge-component";
import useMqtt from "../hooks/useMqtt";
import { useMemo } from "react";
import { MqttConfig } from "../Interfaces/MqttInterfaces";

function LiveTemperatureChart({ host, port, topic }: MqttConfig) {
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
              limit: 16,
              color: "#343deb",
              showTick: true,
              tooltip: {
                text: "Too low temperature!",
              },
              onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
              onMouseMove: () =>
                console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
              onMouseLeave: () =>
                console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
            },
            {
              limit: 20,
              color: "#3495eb",
              showTick: true,
              tooltip: {
                text: "Low temperature!",
              },
            },
            {
              limit: 26,
              color: "#5BE12C",
              showTick: true,
              tooltip: {
                text: "OK temperature!",
              },
            },
            {
              limit: 30,
              color: "#F5CD19",
              showTick: true,
              tooltip: {
                text: "High temperature!",
              },
            },
            {
              color: "#EA4228",
              tooltip: {
                text: "Too high temperature!",
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
          valueLabel: { formatTextValue: (value) => value + "ºC" },
          tickLabels: {
            type: "outer",
            /*
            valueConfig: {
              formatTextValue: (value: string) => value + "ºC",
              fontSize: 10,
            },
            */
            ticks: [
              { value: 12 },
              { value: 14 },
              { value: 16 },
              { value: 18 },
              { value: 20 },
              { value: 22 },
              { value: 24 },
              { value: 26 },
              { value: 28 },
              { value: 30 },
              { value: 32 },
              { value: 34 },
              { value: 36 },
            ],
          },
        }}
        value={message ? Number(message) : 0}
        minValue={10}
        maxValue={38}
      />
    );
  }, [message]);

  return <div>{chart}</div>;
}

export default LiveTemperatureChart;

import { ErrorWithReasonCode } from "mqtt";

export interface ErrorStatus {
  error: boolean;
  errorDetails: ErrorWithReasonCode | Error;
}

export interface MqttConfig {
  host: string;
  port?: string;
  topic: string;
  dataLabel?: string;
}

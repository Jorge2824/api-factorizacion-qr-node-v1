import { Logger } from "./logger";

export class ConsoleLogger implements Logger {
  info(message: string, attributes: unknown = {}) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] INFO: ${message}`;
    console.log(formattedMessage, attributes);
  }

  error(message: string, attributes: unknown = {}) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] ERROR: ${message}`;
    console.error(formattedMessage, attributes);
  }
}
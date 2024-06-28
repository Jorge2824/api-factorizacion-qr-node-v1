export type Attributes = any;

export interface Logger {
  info: (message: string, attributes?: Attributes) => void;
  error: (message: string, attributes?: Attributes) => void;
}
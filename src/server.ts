import http from "node:http";
import express, { Express } from "express";
import { config } from "@core/config/config";
import { calcularRouter, healthRouter } from "./router";
import { ConsoleLogger } from "@logger/console-logger";
import { Logger } from '@logger/logger';
import { AddressInfo } from 'net';

export class Server {
    private readonly app: Express;
    private httpServer?: http.Server;
    private readonly logger: Logger;
  
    constructor() {
      this.logger = new ConsoleLogger();
      this.app = express();
      this.app.use(express.json());
      this.app.use("/calcular", calcularRouter);
      this.app.use("/health", healthRouter);
    }
  
    async start(): Promise<void> {
      return new Promise(resolve => {
        this.httpServer = this.app.listen(config.server.port, () => {
          const { port } = this.httpServer?.address() as AddressInfo;
          this.logger.info(`App is ready and listening on port ${port} 🚀`);
          resolve();
        });
      });
    }
  
    async stop(): Promise<void> {
      return new Promise((resolve, reject) => {
        if (this.httpServer) {
          this.httpServer.close(error => {
            if (error) {
              return reject(error);
            }
            return resolve();
          });
        }
  
        return resolve();
      });
    }
  
    getHttpServer(): http.Server | undefined {
      return this.httpServer;
    }
  }
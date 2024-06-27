import express from "express";

import { ConsoleLogger } from "@shared/logger/console-logger";

import { CalculoController } from "./calculo/infrastructure/calculo-controller";

const calculoController = express.Router();

const logger = new ConsoleLogger();
const calculoController = new CalculoController({ logger });

calculoController.post("/", calculoController.run.bind(calculoController));

export { calculoController };
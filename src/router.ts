import express from "express";

import { CalculoController } from "./calculo/infrastructure/CalculoController";
import { CalcularApplicationService } from "./calculo/application/service/CalcularApplicationService";
import { CalcularDomainService } from "./calculo/domain/service/CalcularDomainService";
import { ConsoleLogger } from '@logger/console-logger';
const logger = new ConsoleLogger();

const calcularRouter = express.Router();
const calcularDomainService = new CalcularDomainService({ logger });
const calcularApplicationService = new CalcularApplicationService({ logger }, calcularDomainService);
const calculoController = new CalculoController({ logger }, calcularApplicationService);
calcularRouter.post("/", calculoController.run.bind(calculoController));

export { calcularRouter };
import { Request, Response } from "express";

import { Logger } from "@logger/logger";
import { IMatrixDto } from '../application/dto/MatrixDto';
import { AppException } from '../application/exception/AppException';
import { CalcularApplicationService } from '../application/service/CalcularApplicationService';
import { MatrixResponseDto } from '../application/response/MatrixResponseDto';

export class CalculoController {
  private readonly logger;
  private readonly calcularApplicationService: CalcularApplicationService;

  constructor(dependencies: { logger: Logger }, calcularApplicationService: CalcularApplicationService) {
    this.logger = dependencies.logger;
    this.calcularApplicationService = calcularApplicationService;
  }

  run(req: Request<any, any, IMatrixDto>, res: Response) {
    try {
        this.logger.info("Request recibido de Q y R");
        const matrizQR = req.body;
        if (!matrizQR.q || !matrizQR.r) {
            throw new AppException('Matrices Q y R son requeridas', undefined, '400');
        }
        const response: MatrixResponseDto = this.calcularApplicationService.calcularMatriz(matrizQR);
        return res.status(200).json(response);
    } catch (error: any) {
        this.logger.error(`Error processing request: ${error?.message}`);
        let code: number = 500;
        if (error?.code) {
            code = parseInt(error.code);
        } 
        res.status(code).json({ status: code, message: error?.message });
    }
  }
}
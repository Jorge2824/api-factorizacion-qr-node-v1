import { Request, Response } from "express";

import { Logger } from "@logger/logger";
import { CalcularDomainService } from '../../domain/service/CalcularDomainService';
import { IMatrixDto } from '../dto/MatrixDto';

export class CalcularApplicationService {
  private readonly logger;
  private readonly calcularDomainService: CalcularDomainService;

  constructor(dependencies: { logger: Logger }, calcularDomainService: CalcularDomainService) {
    this.logger = dependencies.logger;
    this.calcularDomainService = calcularDomainService;
  }

  public calcularMatriz(request: IMatrixDto) : IMatrixDto {
    let rotatedQ = this.calcularDomainService.getRotatedMatrix(request.q);
    let rotatedR = this.calcularDomainService.getRotatedMatrix(request.r);
    return { q: rotatedQ, r: rotatedR };
  }
}
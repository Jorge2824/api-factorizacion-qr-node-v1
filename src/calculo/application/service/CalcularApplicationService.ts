import { Logger } from "@logger/logger";
import { CalcularDomainService } from '../../domain/service/CalcularDomainService';
import { IMatrixDto } from '../dto/MatrixDto';
import { MatrixResponseDto } from '../response/MatrixResponseDto';

export class CalcularApplicationService {
  private readonly logger;
  private readonly calcularDomainService: CalcularDomainService;

  constructor(dependencies: { logger: Logger }, calcularDomainService: CalcularDomainService) {
    this.logger = dependencies.logger;
    this.calcularDomainService = calcularDomainService;
  }

  public calcularMatriz(request: IMatrixDto) : MatrixResponseDto {
    const matrix = [...request.q, ...request.r]
    const flatMatrix = matrix.flat();
    const maxValue = Math.max(...flatMatrix);
    const minValue = Math.min(...flatMatrix);
    const sumTotal = flatMatrix.reduce((a: number, b: number) => a + b, 0);
    const average = sumTotal / flatMatrix.length;
    const isQDiagonal = this.calcularDomainService.isDiagonalMatrix(request.q);
    const isRDiagonal = this.calcularDomainService.isDiagonalMatrix(request.r);
    return {
      status: 200,
      data: {
        maxValue,
        minValue,
        sumTotal,
        average,
        isQDiagonal,
        isRDiagonal
      }
    };
  }
}
import { Logger } from "@logger/logger";

export class CalcularDomainService {
  private readonly logger;

  constructor(dependencies: { logger: Logger }) {
    this.logger = dependencies.logger;
  }

  public isDiagonalMatrix(matrix: number[][]): boolean {
    return matrix.every((row: number[], i: number) => row.every((value: number, j: number) => (i === j) || (value === 0)));
  }
}
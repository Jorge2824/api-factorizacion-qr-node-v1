import { Request, Response } from "express";

import { Logger } from "@logger/logger";

export class CalcularDomainService {
  private readonly logger;

  constructor(dependencies: { logger: Logger }) {
    this.logger = dependencies.logger;
  }

  public getRotatedMatrix(matrix: number[][]) {
    const numRows: number = matrix.length;
    const numCols: number = matrix[0].length;

    let rotated = Array.from({ length: numCols }, () => Array(numRows).fill(0));
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            rotated[j][numRows - i - 1] = matrix[i][j];
        }
    }
    return rotated;
  }
}
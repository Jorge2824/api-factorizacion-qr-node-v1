export interface MatrixResponseDto {
    status: number;
    data: ExtraDataResponseDto;
}

interface ExtraDataResponseDto {
    maxValue: number;
    minValue: number;
    sumTotal: number;
    average: number;
    isQDiagonal: boolean;
    isRDiagonal: boolean;
}
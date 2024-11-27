/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { CalculatorService } from './calculator.service';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Get('add')
  add(@Query('numbers') numbers: string): number {
    return this.calculatorService.add(numbers);
  }
}

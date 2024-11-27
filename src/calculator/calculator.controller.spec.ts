/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';

describe('CalculatorController', () => {
  let controller: CalculatorController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculatorController],
      providers: [CalculatorService],  // Add CalculatorService here
    }).compile();

    controller = module.get<CalculatorController>(CalculatorController);
    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return 0 for an empty string', () => {
    expect(controller.add('')).toBe(0);
  });

  it('should return the number for a single number', () => {
    expect(controller.add('1')).toBe(1);
  });

  it('should return the sum of two numbers', () => {
    expect(controller.add('1,2')).toBe(3);
  });

  it('should return the sum of multiple numbers', () => {
    expect(controller.add('1,2,3,4')).toBe(10);
  });

  it('should handle new lines as delimiters', () => {
    expect(controller.add('1\n2,3')).toBe(6);
  });

  it('should handle custom delimiters', () => {
    expect(controller.add('//;\n1;2')).toBe(3);
  });

  it('should throw an error for negative numbers', () => {
    expect(() => controller.add('1,-2,3')).toThrow('negative numbers not allowed -2');
  });

  it('should throw an error for multiple negative numbers', () => {
    expect(() => controller.add('1,-2,-3')).toThrow('negative numbers not allowed -2, -3');
  });
});

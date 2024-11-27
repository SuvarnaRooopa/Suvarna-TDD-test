/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatorService],
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should return 0 for an empty string', () => {
    expect(service.add('')).toBe(0);
  });

  it('should return the number for a single number', () => {
    expect(service.add('1')).toBe(1);
  });

  it('should return the sum of two numbers', () => {
    expect(service.add('1,2')).toBe(3);
  });

  it('should return the sum of multiple numbers', () => {
    expect(service.add('1,2,3,4')).toBe(10);
  });

  it('should handle new lines as delimiters', () => {
    expect(service.add('1\n2,3')).toBe(6);
  });

  it('should handle custom delimiters', () => {
    expect(service.add('//;\n1;2')).toBe(3);
  });

  it('should throw an error for negative numbers', () => {
    expect(() => service.add('1,-2,3')).toThrow('negative numbers not allowed -2');
  });

  it('should throw an error for multiple negative numbers', () => {
    expect(() => service.add('1,-2,-3')).toThrow('negative numbers not allowed -2, -3');
  });
});

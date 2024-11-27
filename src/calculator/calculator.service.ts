/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  // Method to perform the calculation
  add(numbers: string): number {
    if (!numbers) return 0;

    let delimiter = ',';
    // Check for custom delimiter
    if (numbers.startsWith('//')) {
      const delimiterLine = numbers.split('\n')[0];
      delimiter = delimiterLine[2];  // Get the custom delimiter after "//"
      numbers = numbers.split('\n').slice(1).join('\n'); // Remove the delimiter line
    }

    // Replace custom delimiter or default ',' with a common separator (new line or comma)
    const regex = new RegExp(`[${delimiter}\n]`);
    const numberArray = numbers.split(regex).map(num => num.trim());

    // Validate for negative numbers
    const negatives = numberArray.filter(num => parseInt(num) < 0);
    if (negatives.length > 0) {
      throw new Error(`negative numbers not allowed ${negatives.join(', ')}`);
    }

    // Sum the numbers and return the result
    return numberArray.reduce((acc, num) => acc + parseInt(num), 0);
  }
}

import * as fc from 'fast-check';
import { calculateSeverity } from '../../src/shared/utils/severity';

/**
 * Property-based tests for severity calculation
 * These tests verify correctness properties from design.md
 */

describe('Severity Calculation Properties', () => {
  /**
   * Property: Severity should be monotonic with respect to issues and complexity
   * More issues/complexity should never result in lower severity
   */
  it('should be monotonic - more issues never decrease severity', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 50 }),
        fc.integer({ min: 0, max: 50 }),
        fc.integer({ min: 1, max: 10 }),
        (issues, complexity, increment) => {
          const severity1 = calculateSeverity(issues, complexity);
          const severity2 = calculateSeverity(issues + increment, complexity);

          const severityOrder = ['clean', 'spooky', 'haunted', 'cursed'];
          const index1 = severityOrder.indexOf(severity1);
          const index2 = severityOrder.indexOf(severity2);

          return index2 >= index1;
        }
      )
    );
  });

  /**
   * Property: Zero issues and complexity should always be clean
   */
  it('should return clean for zero issues and complexity', () => {
    expect(calculateSeverity(0, 0)).toBe('clean');
  });

  /**
   * Property: Severity should be deterministic
   */
  it('should return same severity for same inputs', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 50 }),
        fc.integer({ min: 0, max: 50 }),
        (issues, complexity) => {
          const severity1 = calculateSeverity(issues, complexity);
          const severity2 = calculateSeverity(issues, complexity);
          return severity1 === severity2;
        }
      )
    );
  });

  /**
   * Property: Severity should always be one of the valid levels
   */
  it('should always return valid severity level', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 100 }),
        fc.integer({ min: 0, max: 100 }),
        (issues, complexity) => {
          const severity = calculateSeverity(issues, complexity);
          return ['clean', 'spooky', 'haunted', 'cursed'].includes(severity);
        }
      )
    );
  });
});

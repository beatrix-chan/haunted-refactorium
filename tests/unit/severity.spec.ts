import {
  calculateSeverity,
  getSeverityLabel,
  getSeverityColor,
} from '../../src/shared/utils/severity';

describe('Severity Utils', () => {
  describe('calculateSeverity', () => {
    it('should return cursed for high issue count and complexity', () => {
      expect(calculateSeverity(10, 10)).toBe('cursed');
    });

    it('should return haunted for medium issue count', () => {
      expect(calculateSeverity(5, 5)).toBe('haunted');
    });

    it('should return spooky for low issue count', () => {
      expect(calculateSeverity(2, 3)).toBe('spooky');
    });

    it('should return clean for no issues', () => {
      expect(calculateSeverity(0, 0)).toBe('clean');
    });
  });

  describe('getSeverityLabel', () => {
    it('should return spooky labels when spooky mode is enabled', () => {
      expect(getSeverityLabel('cursed', true)).toBe('Cursed');
      expect(getSeverityLabel('haunted', true)).toBe('Haunted');
      expect(getSeverityLabel('spooky', true)).toBe('Spooky');
    });

    it('should return professional labels when spooky mode is disabled', () => {
      expect(getSeverityLabel('cursed', false)).toBe('Critical');
      expect(getSeverityLabel('haunted', false)).toBe('High');
      expect(getSeverityLabel('spooky', false)).toBe('Medium');
    });
  });

  describe('getSeverityColor', () => {
    it('should return correct colors for each severity', () => {
      expect(getSeverityColor('cursed')).toBe('#ff0000');
      expect(getSeverityColor('haunted')).toBe('#ff6b35');
      expect(getSeverityColor('spooky')).toBe('#ffa500');
      expect(getSeverityColor('clean')).toBe('#2dd881');
    });
  });
});

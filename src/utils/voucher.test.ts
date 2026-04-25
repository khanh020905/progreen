import { formatVoucherCode } from './voucher';

describe('Voucher Utility', () => {
  test('formatVoucherCode should trim and uppercase the input', () => {
    const input = ' pgl 300 ';
    const expected = 'PGL300';
    const result = formatVoucherCode(input);
    expect(result).toBe(expected);
  });

  test('formatVoucherCode should handle already formatted codes', () => {
    const input = 'PGL1TR';
    const result = formatVoucherCode(input);
    expect(result).toBe('PGL1TR');
  });

  test('formatVoucherCode should handle empty strings', () => {
    expect(formatVoucherCode('')).toBe('');
  });
});

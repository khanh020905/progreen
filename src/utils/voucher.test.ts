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

describe('getRewardImage', () => {
  const { getRewardImage } = require('./voucher');

  test('should return correct path for standard rewards', () => {
    expect(getRewardImage('Bình nước lúa mạch')).toBe('/rewards/new-water-bottle/z7784889641728_d918a4f4a06858487d8b33f8cce40f8a.jpg');
    expect(getRewardImage('Dây sạc đa năng')).toBe('/rewards/day-sac.jpg');
    expect(getRewardImage('Mũ lưỡi trai')).toBe('/rewards/mu-luoi-trai.jpg');
  });

  test('should return correct path for Velosar Nam variations', () => {
    expect(getRewardImage('Giày Velosar Nam')).toBe('/rewards/velosar-nam-1.jpg');
    expect(getRewardImage('Giày Velosar Nam - Mẫu 2')).toBe('/rewards/velosar-nam-2.jpg');
    expect(getRewardImage('Giày Velosar Nam - Mẫu 5')).toBe('/rewards/velosar-nam-5.jpg');
  });

  test('should return correct path for Velosar Nu variations', () => {
    expect(getRewardImage('Giày Velosar Nữ')).toBe('/rewards/velosar-nu-1.jpg');
    expect(getRewardImage('Giày Velosar Nữ - Mẫu 3')).toBe('/rewards/velosar-nu-3.jpg');
  });

  test('should fallback to default image if no match found', () => {
    expect(getRewardImage('Something Else', '/default.png')).toBe('/default.png');
  });
});

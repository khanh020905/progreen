/**
 * Formats a voucher code by trimming whitespace and converting to uppercase.
 * Removes internal spaces to ensure consistency.
 * @param code The raw voucher code input
 * @returns Formatted voucher code string
 */
export const formatVoucherCode = (code: string): string => {
  if (!code) return '';
  return code.trim().toUpperCase().replace(/\s+/g, '');
};

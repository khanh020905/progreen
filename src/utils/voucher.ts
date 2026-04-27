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

/**
 * Resolves a reward name to its corresponding image path.
 * Supports standard rewards and Velosar variations.
 * @param rewardName Name of the reward from the database
 * @param fallback Default image path if no match is found
 * @returns Image path string
 */
export const getRewardImage = (rewardName: string, fallback: string = ''): string => {
  if (!rewardName) return fallback;
  const name = rewardName.toLowerCase();
  
  // Standard mappings
  if (name.includes('tất')) return "/rewards/socks.png";
  if (name.includes('bình')) return "/rewards/binh-nuoc.jpg";
  if (name.includes('kem')) return "/rewards/toothpaste.png";
  if (name.includes('sạc')) return "/rewards/day-sac.jpg";
  if (name.includes('áo')) return "/rewards/tshirt.png";
  if (name.includes('mũ')) return "/rewards/mu-luoi-trai.jpg";
  
  // Velosar variations
  if (name.includes('velosar')) {
    const gender = name.includes('nam') ? 'nam' : 'nu';
    const match = name.match(/mẫu\s*(\d+)/i);
    const index = match ? match[1] : '1';
    return `/rewards/velosar-${gender}-${index}.jpg`;
  }

  return fallback;
};

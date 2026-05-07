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
  if (name.includes('tất')) return "/rewards/new-sock/z7784889641726_db0599a60ae270e4fc1bb50d5b196f25.jpg";
  if (name.includes('bình')) return "/rewards/new-water-bottle/z7784889641728_d918a4f4a06858487d8b33f8cce40f8a.jpg";
  if (name.includes('kem')) return "/rewards/toothpaste.png";
  if (name.includes('sạc')) return "/rewards/day-sac.jpg";
  if (name.includes('áo')) {
    if (name.includes('nam')) return "/rewards/new-shirt/male/z7784889640203_29273c7ecd460bfc3dc8183d7f2cf60f.jpg";
    return "/rewards/new-shirt/female/z7784889640199_756c04b5a92bd3aed069659453487c93.jpg";
  }
  if (name.includes('mũ')) return "/rewards/mu.jpg";
  
  // Velosar variations
  if (name.includes('velosar')) {
    const gender = name.includes('nam') ? 'nam' : 'nu';
    const match = name.match(/mẫu\s*(\d+)/i);
    const index = match ? match[1] : '1';
    return `/rewards/velosar-${gender}-${index}.jpg`;
  }

  return fallback;
};

/**
 * Checks if a reward name corresponds to a shirt/áo product.
 * @param rewardName Name of the reward
 * @returns true if the reward is a shirt type
 */
export const isShirtReward = (rewardName: string): boolean => {
  const name = rewardName.toLowerCase();
  return name.includes('velosar') || name.includes('áo thể thao') || name.includes('áo');
};

/**
 * Returns an array of images for carousel-enabled rewards.
 * @param rewardName Name of the reward
 * @param genderOverride Optional gender override ('nam' | 'nu') for shirt rewards
 * @returns Array of image paths
 */
export const getRewardImages = (rewardName: string, genderOverride?: 'nam' | 'nu'): string[] => {
  const name = rewardName.toLowerCase();
  
  if (isShirtReward(rewardName)) {
    const isNam = genderOverride ? genderOverride === 'nam' : (name.includes('nam') && !name.includes('nữ'));
    if (isNam) {
      return [
        "/rewards/new-shirt/male/z7784889640203_29273c7ecd460bfc3dc8183d7f2cf60f.jpg",
        "/rewards/new-shirt/male/z7784889640204_1959d5b672f1bead6cc59fc2d0655d13.jpg",
        "/rewards/new-shirt/male/z7784889641725_a73f38be34fe205ef9dd83193ee4ebfb.jpg"
      ];
    } else {
      return [
        "/rewards/new-shirt/female/z7784889640199_756c04b5a92bd3aed069659453487c93.jpg",
        "/rewards/new-shirt/female/z7784889640200_eda170d1ec73dcac963703fd882de80e.jpg",
        "/rewards/new-shirt/female/z7784889640201_a27906c459537a5c15b6607f270e463a.jpg",
        "/rewards/new-shirt/female/z7784889641723_18728812de4c27bb0ca109e93648b2b2.jpg",
        "/rewards/new-shirt/female/z7784889641724_f93bfefee2dac2d98aecfca5176d46ca.jpg"
      ];
    }
  }

  // Default: return single image as an array
  return [getRewardImage(rewardName)];
};

/**
 * Returns selectable design-choice images for shirt rewards.
 * @param gender 'nam' | 'nu'
 */
export const getShirtChoiceImages = (gender: 'nam' | 'nu'): string[] => {
  if (gender === 'nam') {
    return [
      "/rewards/new-shirt/male-choice/z7796798086915_9ae1fa366257195fa542cf63e7b58626.jpg",
      "/rewards/new-shirt/male-choice/z7796798114308_1ef65f2a5dd94b5bd2aafd1d0999c23c.jpg",
      "/rewards/new-shirt/male-choice/z7796798132887_bfb8caf11d723efef716a7460a039c41.jpg",
      "/rewards/new-shirt/male-choice/z7796798208000_3836f8f907f781837cb89918fff14e1f.jpg",
      "/rewards/new-shirt/male-choice/z7796798232906_429658c8cd25a5fed4093d6d71df94dd.jpg",
    ];
  }
  return [
    "/rewards/new-shirt/female-choice/z7796848631227_f57eeba21532d4eee48ac9157773a325.jpg",
    "/rewards/new-shirt/female-choice/z7796848702318_dc5c7f36d354fe0128bfffdfedc8bae6.jpg",
    "/rewards/new-shirt/female-choice/z7796848737851_4a4316a7cc37ec56c481c9387a814771.jpg",
    "/rewards/new-shirt/female-choice/z7796848794811_00e9a1c2ae566aa587590254d64ac0c1.jpg",
    "/rewards/new-shirt/female-choice/z7796848839863_c30a4e659982875002448a6a603652a9.jpg",
  ];
};

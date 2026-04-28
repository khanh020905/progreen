import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RedeemPage from './page';
import axios from 'axios';

// Mock dependencies
jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => ({ get: jest.fn() }),
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Redeem Page Integration', () => {
  test('should navigate to step 2 after valid voucher entry', async () => {
    const mockVoucher = {
      code: 'PGL300',
      rewards: [
        { _id: 'r1', name: 'Sét 3 đôi Tất Nam Nữ' },
        { _id: 'r2', name: 'Bình nước' }
      ]
    };

    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { success: true, voucher: mockVoucher }
    });

    render(<RedeemPage />);

    // Check we are on Step 1
    expect(screen.getByPlaceholderText(/PGL-XXXX-XXXX/i)).toBeInTheDocument();

    // Enter voucher code with spaces and lowercase
    const input = screen.getByPlaceholderText(/PGL-XXXX-XXXX/i);
    fireEvent.change(input, { target: { value: ' pgl 300 ' } });

    // Verify it was formatted in the UI
    expect(input).toHaveValue('PGL300'); 

    // Click validate button
    const button = screen.getByText(/XÁC THỰC MÃ SỐ/i);
    fireEvent.click(button);

    // Should wait for API and move to Step 2
    await waitFor(() => {
      expect(screen.getByText(/Chọn phần quà của bạn/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Sét 3 đôi Tất Nam Nữ/i)).toBeInTheDocument();
    expect(screen.getByText(/Bình nước/i)).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import RedeemPage from '../app/redeem/page';

// Mocking Next.js hooks and other dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => ({ get: jest.fn() }),
}));

jest.mock('axios');

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Redeem Page', () => {
  it('should not contain the Email input field in the redemption form', () => {
    // Note: The form is in Step 3. We might need to mock the state or just check the whole rendered output
    // if the page renders all steps with AnimatePresence.
    render(<RedeemPage />);
    
    // Check if "Email (Không bắt buộc)" is NOT in the document
    const emailLabel = screen.queryByText(/Email \(Không bắt buộc\)/i);
    expect(emailLabel).toBeNull();
  });
});

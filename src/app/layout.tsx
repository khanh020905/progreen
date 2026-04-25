import { Inter, Montserrat } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: 'ProGreenLife - Quét Voucher, Nhận Quà Xanh',
  description: 'Nền tảng đổi quà và quản lý voucher thân thiện với môi trường của ProGreenLife.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}

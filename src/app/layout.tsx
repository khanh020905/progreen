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
  title: 'Pro Green Life - Tặng quà tri ân khách hàng',
  description: 'Chương trình Tặng quà tri ân khách hàng từ Pro Green Life. Nhận ngay những phần quà sức khỏe cao cấp.',
  keywords: ['Pro Green Life', 'voucher', 'quà tặng', 'sức khỏe', 'thẻ quà tặng', 'redeem rewards'],
  authors: [{ name: 'Pro Green Life Team' }],
  openGraph: {
    title: 'Pro Green Life - Tặng quà tri ân khách hàng',
    description: 'Hệ thống đổi quà tặng điện tử cao cấp từ Pro Green Life.',
    url: 'https://progreen-psi.vercel.app',
    siteName: 'Pro Green Life',
    images: [
      {
        url: '/seo-image.png',
        width: 1200,
        height: 630,
        alt: 'Pro Green Life Premium Rewards',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pro Green Life - Tặng quà tri ân khách hàng',
    description: 'Hệ thống đổi quà tặng điện tử cao cấp từ Pro Green Life.',
    images: ['/seo-image.png'],
  },
  metadataBase: new URL('https://progreen-psi.vercel.app'),
  icons: {
    icon: '/logo-final.png',
    apple: '/logo-final.png',
  },
  robots: {
    index: true,
    follow: true,
  },
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

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đổi Quà Tặng - Pro Green Life',
  description: 'Nhập mã voucher của bạn để nhận ngay những phần quà tặng cao cấp từ Pro Green Life. Quy trình đổi quà đơn giản và nhanh chóng.',
  openGraph: {
    title: 'Đổi Quà Tặng - Pro Green Life',
    description: 'Nhập mã voucher của bạn để nhận ngay những phần quà tặng cao cấp từ Pro Green Life.',
    images: ['/seo-image.png'],
  },
};

export default function RedeemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import { Phone, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-white text-[#4a4a4a] pt-20 border-t border-slate-100 font-sans">
      <div className="container mx-auto px-4 lg:px-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: About */}
          <div className="space-y-6">
            <h5 className="text-lg font-black text-[#0e2114]">Về Pro Green Life</h5>
            <div className="h-16 w-auto overflow-hidden flex items-center">
              <Logo className="h-full" />
            </div>
            <p className="text-[13px] leading-relaxed text-slate-500 font-medium">
              Pro Green Life với sứ mệnh cung cấp những sản phẩm bảo vệ sức khỏe có nguồn gốc thiên nhiên từ những thảo dược quý, do người Việt trồng trên đất Việt đã và đang là người bạn đồng hành đáng tin cậy của mọi gia đình Việt Nam.
            </p>
            {/* Bo Cong Thuong Badge - High Reliability Version */}
            <div className="pt-2">
              <a 
                href="http://online.gov.vn/Home/WebDetails/32712?AspxAutoDetectCookieSupport=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
              >
                <img 
                  src="https://cdn.dangkywebsitevoibocongthuong.com/images/logo-da-thong-bao-bo-cong-thuong.png" 
                  alt="Đã thông báo Bộ Công Thương" 
                  className="h-14 w-auto object-contain"
                />
              </a>
            </div>
            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <a href="https://www.facebook.com/progreenlifeofficial" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-brand-50 hover:border-brand-500 transition-all group">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-slate-400 group-hover:fill-brand-600 transition-colors">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@progreenlife.vietnam" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-brand-50 hover:border-brand-500 transition-all group">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-slate-400 group-hover:fill-brand-600 transition-colors">
                  <path d="M12.525.02c1.31-.032 2.612.351 3.758 1.105.153.102.322.213.322.213V5.51c0 .033-.032.033-.032.033-1.258-.412-2.316-.279-3.21.36-.89.64-1.215 1.545-1.215 3.018v2.115h4.158c.033 0 .033.032.033.032v4.444s0 .032-.033.032h-4.158v1.944c0 1.25.32 2.052 1.21 2.694.89.643 1.956.776 3.215.36.033 0 .033.032.033.032v4.067c0 .033-.322.213-.322.213-1.146.754-2.448 1.137-3.758 1.105-2.612-.064-5.234-1.215-6.852-3.41-1.618-2.195-2.022-5.06-1.164-7.854.858-2.794 3.007-5.06 5.62-5.703 2.613-.643 5.433-.243 7.648 1.015.033.021.033.033.033.033V.033S12.558.02 12.525.02z"/>
                </svg>
              </a>
              <a href="https://shopee.vn/progreenlifestore" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-brand-50 hover:border-brand-500 transition-all group font-black text-slate-400 group-hover:text-brand-600 text-[10px]">
                S
              </a>
            </div>
          </div>

          {/* Column 2: Contact */}
          <div className="space-y-6">
            <h5 className="text-lg font-black text-[#0e2114]">Thông tin liên hệ</h5>
            <ul className="space-y-4 text-[13px] font-medium text-slate-500">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-slate-300 flex-shrink-0" />
                <span><strong className="text-slate-700">Địa chỉ:</strong> Tầng 6, Tòa Nhà MD Complex, Số 68 Nguyễn Cơ Thạch, Phường Từ Liêm, Hà Nội.</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-slate-300 flex-shrink-0" />
                <span><strong className="text-slate-700">Điện thoại:</strong> 1800.0060</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-slate-300 flex-shrink-0" />
                <span><strong className="text-slate-700">Email:</strong> CSKH@progreenlife.com.vn</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Links */}
          <div className="space-y-6">
            <h5 className="text-lg font-black text-[#0e2114]">Liên kết</h5>
            <ul className="space-y-4 text-[13px] font-medium text-slate-500">
              <li><a href="https://progreenlife.com.vn/" className="hover:text-brand-600 flex items-center gap-2 transition-colors">• Về Pro Green Life</a></li>
              <li><a href="https://progreenlife.com.vn/collections/tat-ca-san-pham" className="hover:text-brand-600 flex items-center gap-2 transition-colors">• Sản phẩm tiêu biểu</a></li>
              <li><a href="#" className="hover:text-brand-600 flex items-center gap-2 transition-colors">• Đánh giá khách hàng</a></li>
            </ul>
          </div>

          {/* Column 4: Policy */}
          <div className="space-y-6">
            <h5 className="text-lg font-black text-[#0e2114]">Chính sách</h5>
            <ul className="space-y-3 text-[13px] font-medium text-slate-500">
              <li><a href="#" className="hover:text-brand-600 flex items-center gap-2 transition-colors">• Tìm kiếm</a></li>
              <li><a href="#" className="hover:text-brand-600 flex items-center gap-2 transition-colors">• Giới thiệu</a></li>
              <li><a href="#" className="hover:text-brand-600 flex items-center gap-2 transition-colors">• Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:text-brand-600 flex items-center gap-2 transition-colors">• Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-brand-600 flex items-center gap-2 transition-colors">• Điều khoản dịch vụ</a></li>
              <li><a href="https://progreenlife.com.vn/blogs/goc-chuyen-gia" className="hover:text-brand-600 flex items-center gap-2 transition-colors">• Liên hệ</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Copyright Bar */}
      <div className="bg-[#52b74c] py-4 text-center">
        <p className="text-white text-[12px] font-medium opacity-90">
          Copyright © 2026 ProGreenLife. Powered by Haravan
        </p>
      </div>
    </footer>
  );
};

export default Footer;

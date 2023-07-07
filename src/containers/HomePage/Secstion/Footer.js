import React from "react";
import './Footer.scss';

class Footer extends React.Component {
    render() {
        return (
            <div className="Footer">
                <div className="Footer-1">
                    <div className="logo" />
                    <h3>Công ty Cổ phần Công nghệ BookingCare</h3>
                    <div className="location">
                        <div>
                            <i className="fa-solid fa-location-dot"></i>
                            Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam
                        </div>
                    </div>
                    <div className="dkkd">
                        <i className="fa-solid fa-check"></i>
                        ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</div>
                    <div className="dkkd-logo"></div>
                </div>
                <div className="Footer-2">
                    <div>Liên hệ hợp tác</div>
                    <div>Danh bạ y tế</div>
                    <div>Sức khỏe doanh nghiệp</div>
                    <div>Gói chuyển đổi số doanh nghiệp</div>
                    <div>Tuyển dụng</div>
                    <div>Câu hỏi thường gặp</div>
                    <div>Câu hỏi thường gặp</div>
                    <div>Câu hỏi thường gặp</div>
                    <div>Câu hỏi thường gặp</div>
                    <div>Câu hỏi thường gặp</div>
                </div>
                <div className="Footer-3">
                    <div className="HaNoi">
                        <strong>Trụ sở tại Hà Nội</strong>
                        <div>Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</div>
                    </div>
                    <div className="HCM">
                        <strong>Văn phòng tại TP Hồ Chí Minh</strong>
                        <div>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</div>
                    </div>
                    <div className="HoTro">
                        <strong>Hỗ trợ khách hàng</strong>
                        <div>support@bookingcare.vn (7h30 - 18h)</div>
                    </div>
                    <div className="Hotline">
                        <strong>Hotline</strong>
                        <div>024-7301-2468 (7h30 - 18h)</div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Footer;
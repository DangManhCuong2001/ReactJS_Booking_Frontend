import React from "react";
import './Download.scss';

class Download extends React.Component {
    render() {
        return (
            <div className="Download">
                <div className="Download-content">
                    <div className="download-title">
                        <h1>Tải ứng dụng BookingCare</h1>
                        <div>
                            <i className="fa-solid fa-check"></i>
                            Đặt khám nhanh hơn
                        </div>
                        <div>
                            <i className="fa-solid fa-check"></i>
                            Nhận thông báo từ hệ thống
                        </div>
                        <div>
                            <i className="fa-solid fa-check"></i>
                            Nhận hướng dẫn đi khám chi tiếp
                        </div>
                        <div className="download-app">
                            <div className="app1"></div>
                            <div className="app2"></div>
                        </div>
                        <div className="download-link" href="https://bookingcare.vn/app" style={{ color: "#45c3d2" }}>
                            Hoặc mở liên kết:
                            <strong>  https://bookingcare.vn/app</strong>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Download;
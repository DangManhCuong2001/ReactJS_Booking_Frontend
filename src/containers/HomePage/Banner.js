import React from "react";
import './Banner.scss';

class Banner extends React.Component {
    render() {
        return (
            <>
                <div className="home-header">
                    <div className="background">
                        <div className="content-up">
                            <div className="title1">Nền tảng y tế </div>
                            <div className="title2">chăm sóc sức khỏe toàn diện</div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input className="input" placeholder="Tìm chuyên khoa" type="text"></input>
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="download">
                                <div className="android">
                                    {/* <img alt="android" src="../assets/images/androi.png" /> */}
                                </div>
                                <div className="ios">
                                    {/* <img alt="ios" src="../assets/images/ios.png" /> */}
                                </div>
                            </div>
                            <div className="options">
                                <div className="options-child">
                                    <div className="icon-options hospital" >
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className="title-options">
                                        Khám chuyên khoa
                                    </div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-options" >
                                        <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className="title-options">
                                        Khám từ xa
                                    </div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-options" >
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className="title-options">
                                        Khám tổng quát
                                    </div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-options" >
                                        <i className="fas fa-vial"></i>
                                    </div>
                                    <div className="title-options">
                                        Xét nghiệm y học
                                    </div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-options" >
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className="title-options">
                                        Sức khoẻ tinh thần
                                    </div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-options" >
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className="title-options">
                                        Khám nha khoa
                                    </div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-options" >
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className="title-options">
                                        Gói phẫu thuật
                                    </div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-options" >
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className="title-options">
                                        Sản phẩm y tế
                                    </div>
                                </div>
                                <div className="options-child">
                                    <div className="icon-options" >
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className="title-options">
                                        Bài Test sức khoẻ
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Banner;
import React from "react";
import './TuXa.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import tx1 from "../../../assets/images/TuXa/tx1.jpg"
import tx2 from "../../../assets/images/TuXa/tx2.jpg"
import tx3 from "../../../assets/images/TuXa/tx3.jpg"
import tx4 from "../../../assets/images/TuXa/tx4.jpg"
import tx5 from "../../../assets/images/TuXa/tx5.jpg"


class TuXa extends React.Component {
    render() {
        let settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div className="section-tuxa">
                <div className="content-tuxa">
                    <div className="title-tuxa">
                        <div>Bác sĩ từ xa qua Video</div>
                        <button className="button button1">XEM THÊM</button>
                    </div>
                    <Slider {...settings}>
                        <div className="img-tuxa">
                            <img className='background-img' src={tx1} alt="ck1" />
                            <div>Tư vấn, trị liệu Tâm lý từ xa</div>
                        </div>
                        <div className="img-tuxa" >
                            <img className='background-img' src={tx2} alt="ck1" />
                            <div>Sức khoẻ tâm thần từ xa</div>
                        </div>
                        <div className="img-tuxa">
                            <img className='background-img' src={tx3} alt="ck1" />
                            <div>Bác sĩ da liễu từ xa</div>
                        </div>
                        <div className='img-tuxa'>
                            <img className='background-img' src={tx4} alt="ck1" />
                            <div>bác sĩ Cơ-Xương-Khớp từ xa</div>
                        </div>
                        <div className="img-tuxa">
                            <img className='background-img' src={tx5} alt="ck1" />
                            <div>Co xuong khop</div>
                        </div>
                    </Slider>
                </div>
            </div>
        )
    }
}

export default TuXa;
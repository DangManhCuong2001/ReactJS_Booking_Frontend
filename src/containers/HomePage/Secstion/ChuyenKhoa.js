import React from "react";
import './ChuyenKhoa.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getAllSpecialty } from "../../../services/userService";
import { withRouter } from "react-router";

class ChuyenKhoa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
        //     this.setState({
        //         arrDoctors: this.props.topDoctorsRedux,
        //     })
        // }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data
            })
        }
    }

    handleInfoSpecialty = (item) => {
        this.props.history.push(`/info-specialty/${item.id}`)
    }

    render() {
        console.log('state', this.state)
        let { dataSpecialty } = this.state
        let settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div className="section-chuyenkhoa">
                <div className="content-chuyenkhoa">
                    <div className="title-chuyenkhoa">
                        <div>Chuyên khoa phổ biến</div>
                        <button className="button button1">XEM THÊM</button>
                    </div>
                    <Slider {...settings}>
                        {dataSpecialty && dataSpecialty.length > 0
                            && dataSpecialty.map((item, index) => {
                                return (
                                    <div className="img-chuyenkhoa" key={index}
                                        onClick={() => { this.handleInfoSpecialty(item) }}
                                    >
                                        <div className="background-img"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        ></div>
                                        <div>{item.name}</div>
                                    </div>
                                )
                            })}
                    </Slider>
                </div>
            </div>
        )
    }
}

export default withRouter(ChuyenKhoa);
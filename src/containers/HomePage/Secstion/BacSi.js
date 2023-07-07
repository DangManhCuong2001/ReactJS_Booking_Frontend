import React, { Component } from "react";
import './bacsi.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as actions from '../../../store/actions'
import { connect } from 'react-redux';
import { withRouter } from "react-router";


class ChuyenKhoa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    handleInfoDoctor = (doctor) => {
        this.props.history.push(`/info-doctor/${doctor.id}`)
    }

    render() {
        let settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        let arrDoctors = this.state.arrDoctors
        console.log('check doctors', this.props.topDoctorsRedux)
        return (
            <div className="section-bacsi">
                <div className="content-chuyenkhoa">
                    <div className="title-chuyenkhoa">
                        <div>Bác sĩ nổi bật tuần qua</div>
                        <button className="button button1">XEM THÊM</button>
                    </div>
                    <Slider {...settings}>
                        {arrDoctors && arrDoctors.length > 0
                            && arrDoctors.map((item, index) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                }
                                let name = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                                return (
                                    <div className="section-customize" key={index} onClick={() => { this.handleInfoDoctor(item) }}>
                                        <div className="customize-border">
                                            <div className="img-chuyenkhoa" style={{ backgroundImage: `url(${imageBase64})` }}>
                                            </div>
                                            <div className="position-text">
                                                <div>{name}</div>
                                                <div>suc khoe tam than- tu van tri lieu tam</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </Slider>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        topDoctorsRedux: state.admin.topDoctors

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChuyenKhoa));

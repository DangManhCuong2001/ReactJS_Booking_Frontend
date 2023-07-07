import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule2.scss'
import moment from 'moment/moment';
import localization from 'moment/locale/vi'
import { getExtraInfoDoctors } from '../../../services/userService';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPrice: false,
            extraInfo: {},
        }
    }



    async componentDidMount() {
        if (this.props.doctorId) {
            let res = await getExtraInfoDoctors(this.props.doctorId)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data
                })
            }
        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            let res = await getExtraInfoDoctors(this.props.doctorId)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfo: res.data
                })
            }

        }

    }

    showHide = (status) => {
        this.setState({
            isShowPrice: status
        })
    }

    render() {
        let { isShowPrice, extraInfo } = this.state;
        // console.log('state', this.state)
        return (
            <div className='schedule2-container'>
                <div className='content-up'>
                    <div className='title-address'>ĐỊA CHỈ KHÁM</div>
                    <div className='name-clinic'>
                        {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                    </div>
                    <div className='address'>
                        {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                    {isShowPrice === false ? <div className='price-hide'>
                        GIÁ KHÁM:
                        {extraInfo && extraInfo.priceData ? extraInfo.priceData.valueVi : ''}
                        <span
                            onClick={() => this.showHide(true)}
                        >Xem chi tiết</span>
                    </div>
                        :
                        <div className='price-show'>
                            <div className='title-price'>GIÁ KHÁM:
                            </div>
                            <div className='price'>Giá khám:
                                {extraInfo && extraInfo.priceData ? extraInfo.priceData.valueVi : ''}
                            </div>
                            <div className='note'>
                                {extraInfo && extraInfo.note ? extraInfo.note : ''}
                            </div>
                            <span className='hide-price'
                                onClick={() => this.showHide(false)}
                            >
                                Ẩn bảng giá
                            </span>
                        </div>

                    }


                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);

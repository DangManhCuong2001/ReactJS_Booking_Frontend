import React, { Component } from 'react';
import { connect } from "react-redux";
import './doctorSchedule.scss'
import moment from 'moment/moment';
import localization from 'moment/locale/vi'
import { getScheduleDoctors } from '../../../services/userService';
import BookingModal from './BookingModal';


class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allTimes: [],
            isOpenBookingModal: false,
            dataScheduleTimeModal: {}
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    // async componentDidMount() {
    //     let allDays = []
    //     for (let i = 0; i < 7; i++) {
    //         let object = {};
    //         let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
    //         object.label = this.capitalizeFirstLetter(labelVi)
    //         object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
    //         allDays.push(object);
    //     }
    //     this.setState({
    //         allDays: allDays,
    //     })
    // }

    async componentDidMount() {
        let allDays = this.getArrDays()
        if (this.props.doctorId) {
            let res = await getScheduleDoctors(this.props.doctorId, allDays[0].value)
            this.setState({
                allTimes: res.data ? res.data : []
            })
        }
        this.setState({
            allDays: allDays,
        })
    }

    getArrDays = () => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (i === 0) {
                let ddMM = moment(new Date()).format('DD/MM');
                let today = `Hôm nay - ${ddMM}`;
                object.label = today;
            } else {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi)
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (this.props.allDays !== prevProps.allDays) {
        //     let allDays = this.state.allDays
        //     this.setState({
        //         allDays: allDays
        //     })
        // }
        if (this.props.doctorId !== prevProps.doctorId) {
            let allDays = this.getArrDays()
            let res = await getScheduleDoctors(this.props.doctorId, allDays[0].value)
            this.setState({
                allTimes: res.data ? res.data : []
            })
        }
    }

    handleOnchangeSelect = async (event) => {
        if (this.props.doctorId && this.props.doctorId !== -1) {
            let doctorId = this.props.doctorId;
            let date = event.target.value
            let res = await getScheduleDoctors(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allTimes: res.data ? res.data : []
                })
            }
            console.log('cech res from react', res)
        }
    }

    handleClickSchedule = (time) => {
        this.setState({
            isOpenBookingModal: true,
            dataScheduleTimeModal: time
        })
    }

    closeBooking = () => {
        this.setState({
            isOpenBookingModal: false,
        })
    }


    render() {
        let { allDays, allTimes, isOpenBookingModal, dataScheduleTimeModal } = this.state
        return (
            <>
                <div className='schedule-container'>
                    <div className='select-day'>
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>{item.label}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='select-time'>
                        <div className='text-calendar'>
                            <span><i className="fas fa-calendar-alt"> Lịch khám</i></span>
                        </div>
                        <div className='time-content'>
                            {allTimes && allTimes.length > 0 ?
                                allTimes.map((item, index) => {
                                    // let timeTypeData = item.timeTypeData.valueVi
                                    return (
                                        <button key={index}
                                            onClick={() => this.handleClickSchedule(item)}
                                        >{item.timeTypeData.valueVi}</button>
                                    )
                                })
                                :
                                <div>Không có lịch hẹn trong ngày này</div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenBookingModal={isOpenBookingModal}
                    closeBooking={this.closeBooking}
                    dataTime={dataScheduleTimeModal}
                />
            </>
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

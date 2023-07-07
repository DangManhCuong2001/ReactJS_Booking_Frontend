import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { Modal } from 'reactstrap';
import ProfileDoctor from './ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../components/Input/DatePicker';
import * as actions from '../../../store/actions'
import Select from 'react-select';
import { saveBookSchedule } from '../../../services/userService';
import { toast } from 'react-toastify';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            genders: '',
            selectGender: '',
            address: '',
            reason: '',
            doctorId: '',
            birthday: '',
            timeType: ''
        }
    }



    async componentDidMount() {
        this.props.getGender()
    }

    builDataGender = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = item.valueVi;
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result;
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.genders !== prevProps.genders) {
            if (this.props.genders.length > 0) {
                this.setState({
                    genders: this.builDataGender(this.props.genders)
                })
            }
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    handleChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCoppy = { ...this.state };
        stateCoppy[id] = valueInput
        this.setState({
            ...stateCoppy
        })
    }

    handleChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handeleSaveBooking = async () => {
        let date = new Date(this.state.birthday).getTime();
        let res = await saveBookSchedule({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            selectGender: this.state.selectGender.value,
            address: this.state.address,
            reason: this.state.reason,
            doctorId: this.state.doctorId,
            // birthday: this.state.birthday,
            timeType: this.state.timeType,
            date: date
        })
        if (res && res.errCode === 0) {
            toast.success('Đặt lịch thành công')
            this.props.closeBooking();
        } else {
            toast.success('Đặt lịch thất bại')
        }

    }

    render() {
        let { isOpenBookingModal, closeBooking, dataTime } = this.props
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        // console.log('state', this.props)
        return (
            <Modal isOpen={isOpenBookingModal} className='booking-modal'
                centered size='lg'
            >
                <div className='booking-container' >
                    <div className='booking-header' >
                        <span className='left'>Thông tin đặt lịch khám bệnh</span>
                        <span
                            className='right'
                            onClick={closeBooking}
                        >
                            <i className='fas fa-times'></i>
                        </span>
                    </div>
                    <div className='booking-body' >
                        <div className='doctor-info'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <label>Họ tên</label>
                                <input className='form-control' type='text'
                                    value={this.state.fullName}
                                    onChange={(event) => { this.handleChangeInput(event, 'fullName') }}
                                ></input>
                            </div>
                            <div className='col-6'>
                                <label>Số điện thoại</label>
                                <input className='form-control' type='text'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => { this.handleChangeInput(event, 'phoneNumber') }}
                                ></input>
                            </div>
                            <div className='col-6'>
                                <label>Email</label>
                                <input className='form-control' type='email'
                                    value={this.state.email} onChange={(event) => { this.handleChangeInput(event, 'email') }}
                                ></input>
                            </div>
                            <div className='col-6'>
                                <label>Địa chỉ liên hệ</label>
                                <input className='form-control' type='text'
                                    value={this.state.address}
                                    onChange={(event) => { this.handleChangeInput(event, 'address') }}
                                ></input>
                            </div>
                            <div className='col-6'>
                                <label>Ngày sinh</label>
                                <DatePicker className='form-control' type='text'
                                    value={this.state.birthday}
                                    onChange={this.handleChangeDatePicker}
                                />
                            </div>

                            <div className='col-6'>
                                <label>Giới tính</label>
                                <Select
                                    value={this.state.selectGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                            <div className='col-12'>
                                <label>Lý do khám</label>
                                <input className='form-control' type='text'
                                    value={this.state.reason}
                                    onChange={(event) => { this.handleChangeInput(event, 'reason') }}
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className='booking-footer' >
                        <button className='btn-booking-confirm'
                            onClick={() => { this.handeleSaveBooking() }}
                        >
                            Xác nhận
                        </button>
                        <button className='btn-booking-cancle'
                            onClick={closeBooking}
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </Modal>

        );
    }
}

const mapStateToProps = state => {
    return {
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);

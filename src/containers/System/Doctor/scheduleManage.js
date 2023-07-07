import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './scheduleManager.scss'
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from "lodash"
import { dateFormat } from '../../../utils'
import { saveBulkSchedule } from '../../../services/userService';
import { FormattedDate } from 'react-intl';


class scheduleManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
            listDoctors: [],
            currentDate: new Date(),
            rangeTime: [],
        }
    }

    componentDidMount() {
        this.props.getAllDoctors();
        this.props.fetchAllTimeDoctor()
    }



    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allTimeDoctor !== this.props.allTimeDoctor) {
            let data = this.props.allTimeDoctor
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    buildInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let label = `${item.firstName} ${item.lastName}`
                object.label = label;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }

    handleChange = async (selectedOption) => {
        this.setState({ selectedOption });


    };
    handleChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickTime = (time) => {
        let rangeTime = this.state.rangeTime;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }

    }
    handleSaveTime = async () => {
        let { selectedOption, currentDate, rangeTime } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Vui long chon ngay");
            return;
        }
        if (selectedOption && _.isEmpty(selectedOption)) {
            toast.error('Vui long chon bac si');
            return;
        }
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let object = {};
                    object.doctorId = selectedOption.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object)
                })
            } else {
                toast.error("Vui long chon gio")
                return;
            }
        }
        let res = await saveBulkSchedule({
            arrSchedule: result,
            doctorId: selectedOption.value,
            formatedDate: formatedDate
        })
        if (res && res.errCode === 0) {
            toast.success("Luu thanh cong")
        } else {
            toast.error("Luu that bai")
            console.log('res', res)
        }

    }

    render() {
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let rangeTime = this.state.rangeTime
        return (
            <div className="schedule-manage-container">
                <div className='schedule-manage-tittle'>
                    Quản lý kế hoạch khám bệnh của Bác sĩ
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Chọn Bác sĩ</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.listDoctors}

                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chọn ngày</label>
                            <DatePicker className='form-control'
                                value={this.state.currentDate}
                                minDate={yesterday}
                                onChange={this.handleChangeDatePicker}
                            />
                        </div>
                        <div className='col-12 pick-time'>
                            {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                return (
                                    <button
                                        onClick={() => this.handleClickTime(item)}
                                        className={item.isSelected === true ? 'btn pick' : 'btn none-pick'}
                                        key={index}> {item.valueVi}</button>
                                )
                            })
                            }
                        </div>

                    </div>
                    <button
                        onClick={() => this.handleSaveTime()}
                        className='btn save'>Lưu</button>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        allTimeDoctor: state.admin.allTimeDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllTimeDoctor: () => dispatch(actions.fetchTimeDoctors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(scheduleManage);

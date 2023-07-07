import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './infoSpecialty.scss'
import Footer2 from ' ../../../src/containers/HomePage/Secstion/Footer2'
import HomeHeader from '../../HomePage/HomeHeader';
import Footer from ' ../../../src/containers/HomePage/Secstion/Footer'
import DoctorSchedule from '../Doctor/DoctorSchedule'
import DoctorSchedule2 from '../Doctor/DoctorSchedule2'
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getInfoSpecialById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash'



class SpecialtyManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataInfoSpecialty: {},
            listProvince: [],
            isReadMore: false,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getInfoSpecialById({
                id: id,
                location: 'ALL'
            })
            let resProvince = await getAllCodeService('PROVINCE')
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map((item, index) => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resProvince.data
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        type: 'PRONVINCE',
                        keyMap: 'ALL',
                        valueVi: 'Toàn quốc'
                    })
                }
                this.setState({
                    dataInfoSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }



    componentDidUpdate(prevProps, prevState, snapshot) {


    }


    handleOnchangeSelect = async (event) => {
        // console.log('event', event.target.value)
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = await getInfoSpecialById({
                id: id,
                location: location
            })
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataInfoSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }



    render() {
        let { arrDoctorId, dataInfoSpecialty, listProvince } = this.state

        console.log('state all d', this.state)
        return (
            <>
                <div className='info-specialty-container'>
                    <HomeHeader />

                    <div className='description-middle'>

                        < div className='description-specialty-short'>

                            {dataInfoSpecialty && !_.isEmpty(dataInfoSpecialty)
                                && <div dangerouslySetInnerHTML={{ __html: dataInfoSpecialty.descriptionHTML }}>
                                </div>
                            }

                        </div>

                    </div>

                    <div className='specialty-middle-content'>
                        <div className='search-province'>
                            <select onChange={(event) => this.handleOnchangeSelect(event)}>
                                {listProvince && listProvince.length > 0 && listProvince.map((item, index) => {
                                    return (
                                        <option key={index}
                                            value={item.keyMap}
                                        >{item.valueVi}</option>
                                    )
                                })
                                }
                            </select>
                        </div>
                        {arrDoctorId && arrDoctorId.length > 0 && arrDoctorId.map((item, index) => {
                            return (
                                <div className="schedule-specialty" key={index}>
                                    <div className='dt-content-left'>
                                        <ProfileDoctor
                                            doctorId={item}
                                        // isShowPrice={false}
                                        />
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorId={item}
                                            />
                                        </div>
                                        <div className='doctor-schedule2'>
                                            <DoctorSchedule2
                                                doctorId={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div >
                <div>
                    <Footer />
                </div>
                <div>
                    <Footer2 />
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyManage);

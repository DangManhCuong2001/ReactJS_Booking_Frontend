import React, { Component } from 'react';
import { connect } from "react-redux";
import './profileDoctor.scss'
import { getProfileDoctors } from '../../../services/userService';
import _ from 'lodash';
import moment from 'moment';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        }
    }



    async componentDidMount() {
        let data = await this.getProfileDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    getProfileDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctors(id)
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (this.props.doctorId !== prevProps.doctorId) {
        //     this.getProfileDoctor(this.props.doctorId)
        // }

    }

    renderTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = dataTime.timeTypeData.valueVi
            let date = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            return (
                <>
                    <div>{time}-{date}</div>
                    <div>dsfsdfsdfds</div>
                </>
            )
        }

    }

    render() {
        let { dataProfile } = this.state
        // let { dataTime } = this.props
        let { isShowPrice } = this.props

        let name = '';
        if (dataProfile && dataProfile.positionData) {
            name = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        // console.log('state1', this.props)
        return (
            <div className='frofile-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}>

                    </div>
                    <div className='content-right'>
                        <div className='content-up'>
                            <div>{name}</div>
                        </div>
                        <div className='content-down'>
                            {dataProfile.Markdown && dataProfile.Markdown.description
                                && <span>
                                    {dataProfile.Markdown.description}
                                </span>
                            }

                            <>{this.renderTimeBooking()}</>
                        </div>
                    </div>

                </div>
                {isShowPrice === true &&
                    < div className='price'>
                        {dataProfile && dataProfile.Doctor_Info
                            && <span>
                                Giá khám:
                                {dataProfile.Doctor_Info.priceData.valueVi}
                            </span>
                        }
                    </div>
                }
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);

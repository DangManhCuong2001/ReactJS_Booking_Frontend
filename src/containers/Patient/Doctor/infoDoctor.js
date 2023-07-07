import React, { Component } from 'react';
import { connect } from "react-redux";
import './infoDoctor.scss'
import Footer2 from ' ../../../src/containers/HomePage/Secstion/Footer2'
import HomeHeader from '../../HomePage/HomeHeader';
import Footer from ' ../../../src/containers/HomePage/Secstion/Footer'
import { getInfoDoctorService } from '../../../services/userService';
import DoctorSchedule from './DoctorSchedule'
import DoctorSchedule2 from './DoctorSchedule2'

class infoDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoDoctor: {},
            currentDoctorId: -1,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getInfoDoctorService(id)
            if (res && res.errCode === 0) {
                this.setState({
                    infoDoctor: res.data,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
        //     this.setState({
        //         arrDoctors: this.props.topDoctorsRedux,
        //     })
        // }
    }




    render() {
        console.log('state', this.state)
        let { infoDoctor } = this.state
        let name = '';
        if (infoDoctor && infoDoctor.positionData) {
            name = `${infoDoctor.positionData.valueVi}, ${infoDoctor.firstName} ${infoDoctor.lastName}`
        }
        return (
            <>
                <div>
                    <HomeHeader />
                </div>
                <div className='info-doctor-container'>
                    <div className='content1-container'>
                        <div className='intro-doctor'>
                            <div className='content-left' style={{ backgroundImage: `url(${infoDoctor.image})` }}>

                            </div>
                            <div className='content-right'>
                                <div className='content-up'>
                                    <div>{name}</div>
                                </div>
                                <div className='content-down'>
                                    {infoDoctor.Markdown && infoDoctor.Markdown.description
                                        && <span>
                                            {infoDoctor.Markdown.description}
                                        </span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='schedule-doctor'>
                            <div className='content-left'>
                                <DoctorSchedule
                                    doctorId={this.state.currentDoctorId}
                                />
                            </div>
                            <div className='content-right'>
                                <DoctorSchedule2
                                    doctorId={this.state.currentDoctorId}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='content2-container'>
                        <div className='info-doctor'>
                            {infoDoctor && infoDoctor.Markdown && infoDoctor.Markdown.contentHTML
                                && <div dangerouslySetInnerHTML={{ __html: infoDoctor.Markdown.contentHTML }}>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='content3-container'>
                        <div className='comment'>

                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(infoDoctor);

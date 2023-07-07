import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { Link } from "react-router-dom";
import ModalMenu from './ModalMenu';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalUser: false,
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    toggleModal = () => {
        this.setState({
            isOpenMenu: !this.state.isOpenMenu
        })
    }
    render() {


        return (

            <div className="Home-header-container">
                <ModalMenu
                    isOpen={this.state.isOpenModalUser}
                    toggleFromparent={this.toggleUserModal}
                />
                <div className="nav-bar">

                    <div className="left-nav">

                        <i className="fas fa-bars"
                            onClick={() => { this.handleAddNewUser() }}
                        ></i>


                        <Link to="/home" className='link-logo'>
                        </Link>
                    </div>
                    <div className="center-nav">
                        <div className="child-content">
                            <b>Chuyên khoa</b>
                            <div className="sub">Tìm bác sĩ theo chuyên khoa</div>
                        </div>
                        <div className="child-content">
                            <b>Cơ sở y tế</b>
                            <div className="sub">Chọn bệnh viện phòng khám</div>
                        </div>
                        <div className="child-content">
                            <b>Bác sĩ</b>
                            <div className="sub">bác sĩ giỏi</div>
                        </div>
                        <div className="child-content">
                            <b>Gói khám</b>
                            <div className="sub">Khám sức khoẻ tổng quát</div>
                        </div>
                    </div>
                    <div className="right-nav">
                        <div className="ho-tro">
                            <i class="fas fa-question-circle"></i>
                            <p>Hỗ Trợ</p>
                        </div>
                        <b className="phone">024-7301-2468</b>
                    </div>
                </div>
            </div >

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
import React from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../services/userService';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isshowpassword: '',
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLogin(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('dang nhap thanh cong')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log('hoidantit', error.response)
        }

    }


    handleShowHidePassword = () => {
        this.setState({
            isshowpassword: !this.state.isshowpassword
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin();
        }
    }
    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='title-login col-12 text-center'>Login</div>
                        <div className='login-input col-12 form-group'>
                            <label>Username</label>
                            <input
                                value={this.state.username}
                                onChange={(event) => { this.handleOnChangeUsername(event) }}
                                type='text' className='form-control'
                                placeholder='Enter your Username' />
                        </div>
                        <div className='login-input col-12 form-group'>
                            <label>Password</label>
                            <div className='custom-input'>
                                <input
                                    value={this.state.password}
                                    onChange={(event) => { this.handleOnChangePassword(event) }}
                                    type={this.state.isshowpassword ? 'text' : 'password'}
                                    onKeyDown={(event) => { this.handleKeyDown(event) }}
                                    className='form-control'
                                    placeholder='Enter your Password'
                                />
                                <span
                                    onClick={() => { this.handleShowHidePassword() }}
                                ><i className={this.state.isshowpassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>

                        <div className='login col-12'>
                            <button
                                className='btn-login'
                                onClick={() => { this.handleLogin() }}
                            >Login</button>
                        </div>
                        <div className='col-12'>
                            <span>Forgot your password</span>
                        </div>
                        <div className='login-with col-12'>
                            <span>Or login with</span>
                        </div>
                        <div className='social-login col-12'>
                            <i className="facebook fab fa-facebook-square"></i>
                            <i className="twitter fab fa-twitter"></i>
                            <i className="google fab fa-google-plus"></i>
                        </div>
                    </div>
                </div>
            </div >
        )

    }
}
const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userinfo) => dispatch(actions.userLoginSuccess(userinfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

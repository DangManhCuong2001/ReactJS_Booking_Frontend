import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getAllCodeService } from '../../../services/userService';
import * as actions from '../../../store/actions'
import './UserRedux.scss'


class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImg: '',

            email: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
        }
    }



    async componentDidMount() {
        // ---cach1---
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // ----cach2-----
        // this.props.dispatch(actions.fetchGenderStart())
        // ----API-----
        //     try {
        //         let res = await getAllCodeService('gender')
        //         if (res && res.errCode === 0) {
        //             this.setState({
        //                 genderArr: res.data
        //             })
        //         }
        //         console.log('check res', res)
        //     } catch (e) {
        //         console.log(e)
        //     }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
                gender: this.props.genderRedux && this.props.genderRedux.length > 0 ? this.props.genderRedux[0].key : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,
                role: this.props.roleRedux && this.props.roleRedux.length > 0 ? this.props.roleRedux[0].key : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,
                position: this.props.positionRedux && this.props.positionRedux.length > 0 ? this.props.positionRedux[0].key : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                email: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
            })
        }
    }

    handleChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImg: objectUrl
            })
        }
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateinput();
        if (isValid === false) return;

        // fire redux action
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phonenumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,
        })
        console.log('submit check state', this.setState)
    }

    handleChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => {
            console.log('onchange input', this.state)
        })
    }

    checkValidateinput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phonenumber',
            'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Vui long dien: ' + arrCheck[i])
                break;
            }
        }
        return isValid

    }

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let isGetGender = this.props.isLoadingGender

        let { email, password, firstName, lastName, phonenumber,
            address, gender, position, role, avatar } = this.state
        return (
            <div className='user-redux-container'>
                <div className="title" >
                    User Redux
                </div>
                <div>{isGetGender === true ? 'Loading genders' : ''}</div>
                <div className='user-redux-body'></div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>Add new user</div>
                        <div className='col-6'>
                            <label>Email</label>
                            <input className='form-control' type='email'
                                value={email} onChange={(event) => { this.handleChangeInput(event, 'email') }}
                            ></input>
                        </div>
                        <div className='col-6'>
                            <label>Password</label>
                            <input className='form-control' type='password'
                                value={password} onChange={(event) => { this.handleChangeInput(event, 'password') }}
                            ></input>
                        </div>
                        <div className='col-6'>
                            <label>First name</label>
                            <input className='form-control' type='text'
                                value={firstName} onChange={(event) => { this.handleChangeInput(event, 'firstName') }}
                            ></input>
                        </div>
                        <div className='col-6'>
                            <label>Last name</label>
                            <input className='form-control' type='text'
                                value={lastName} onChange={(event) => { this.handleChangeInput(event, 'lastName') }}
                            ></input>
                        </div>
                        <div className='col-6'>
                            <label>Phone number</label>
                            <input className='form-control' type='text'
                                value={phonenumber} onChange={(event) => { this.handleChangeInput(event, 'phonenumber') }}
                            ></input>
                        </div>
                        <div className='col-6'>
                            <label>Address</label>
                            <input className='form-control' type='text'
                                value={address} onChange={(event) => { this.handleChangeInput(event, 'address') }}
                            ></input>
                        </div>
                        <div className='col-6'>
                            <label>Gender</label>
                            <select className='form-control'
                                onChange={(event) => { this.handleChangeInput(event, 'gender') }}
                            >
                                {genders && genders.length > 0 && genders.map((item, index) => {
                                    return (
                                        <option key={index} value={item.key}>{item.valueVi}</option>
                                    )
                                })
                                }
                            </select>
                        </div>
                        <div className='col-6'>
                            <label>RoleId</label>
                            <select className='form-control'
                                onChange={(event) => { this.handleChangeInput(event, 'role') }}
                            >
                                {roles && roles.length > 0 && roles.map((item, index) => {
                                    return (

                                        <option key={index} value={item.key}>{item.valueVi}</option>
                                    )
                                })
                                }
                            </select>
                        </div>
                        <div className='col-6'>
                            <label>Position</label>
                            <select className='form-control'
                                onChange={(event) => { this.handleChangeInput(event, 'position') }}
                            >
                                {positions && positions.length > 0 && positions.map((item, index) => {
                                    return (
                                        <option key={index} value={item.key}>{item.valueVi}</option>
                                    )
                                })
                                }
                            </select>
                        </div>

                        <div className='preview-container col-6'>
                            <label>image</label>
                            <input
                                className='form-control'
                                type='file'
                                onChange={(event) => { this.handleChangeImage(event) }}
                            ></input>
                            <div className='preview-image'
                                style={{ backgroundImage: `url(${this.state.previewImg})` }}></div>
                        </div>
                        <div className='btn-save col-12'
                            onClick={() => { this.handleSaveUser() }}
                        >
                            <button className='btn btn-primary'>Save</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        // processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

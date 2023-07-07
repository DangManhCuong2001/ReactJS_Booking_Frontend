import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'

import CommonUtils from '../../../utils/CommonUtils';


class ModalUser1 extends Component {
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
                gender: this.props.genderRedux && this.props.genderRedux.length > 0 ? this.props.genderRedux[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,
                role: this.props.roleRedux && this.props.roleRedux.length > 0 ? this.props.roleRedux[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,
                position: this.props.positionRedux && this.props.positionRedux.length > 0 ? this.props.positionRedux[0].keyMap : ''
            })
        }

    }

    handleChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImg: objectUrl,
                avatar: base64
            })
        }
    }

    handleSaveUser = () => {
        console.log('check save', this.state)
        this.props.toggleFromparent();
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
            avatar: this.state.avatar,
        })
        setTimeout(() => {
            this.props.viewAllUser()
        }, 1000)
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

    toggle = () => {
        this.props.toggleFromparent()
    }



    render() {

        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;


        let { email, password, firstName, lastName, phonenumber,
            address, gender, position, role } = this.state;
        return (
            < Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg">
                <ModalHeader toggle={() => { this.toggle() }} >Create new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='row'>
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
                                    values={gender}
                                    onChange={(event) => { this.handleChangeInput(event, 'gender') }}
                                >
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                        )
                                    })
                                    }
                                </select>
                            </div>
                            <div className='col-6'>
                                <label>RoleId</label>
                                <select className='form-control'
                                    value={role}
                                    onChange={(event) => { this.handleChangeInput(event, 'role') }}
                                >
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (

                                            <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                        )
                                    })
                                    }
                                </select>
                            </div>
                            <div className='col-6'>
                                <label>Position</label>
                                <select className='form-control'
                                    value={position}
                                    onChange={(event) => { this.handleChangeInput(event, 'position') }}
                                >
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{item.valueVi}</option>
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
                            <div className='btn-save col-12'>
                                <button className='btn btn-primary'
                                    onClick={() => { this.handleSaveUser() }}>
                                    Save
                                </button>
                                <Button color="secondary"
                                    onClick={() => { this.toggle() }}>
                                    Cancel
                                </Button>
                            </div>

                        </div>
                    </div>
                </ModalBody>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        viewAllUser: () => dispatch(actions.fetchAllUserStart()),

        // processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser1);


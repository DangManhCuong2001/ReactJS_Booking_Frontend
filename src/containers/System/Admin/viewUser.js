import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import ModalUser from './ModalUser1';
import ModalUserEdit from './ModalUserEdit';
// import { getAllUsers } from '../../services/userService';
import './viewUser.scss'
import { editUserService } from '../../../services/userService';


class viewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
            userEdit: {}
        }
    }

    componentDidMount() {
        this.props.viewAllUser();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers,
            })
        }
    }
    handleDeleteUser = (user) => {
        // console.log("check delete user", user)
        this.props.deleteUser(user.id);
        setTimeout(() => {
            this.props.viewAllUser()
        }, 500)

    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }
    handleEditUser = (user) => {
        this.setState({
            isOpenModalUserEdit: true,
            userEdit: user
        })
        console.log('check user edit', user)
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    toggleUserModalEdit = () => {
        this.setState({
            isOpenModalUserEdit: !this.state.isOpenModalUserEdit
        })
    }

    doEditUser = async (user) => {
        await editUserService(user)

        setTimeout(() => {
            this.props.viewAllUser()
        }, 500)
    }


    render() {
        // console.log('check all users', this.props.listUsers)
        // console.log('check state users', this.state.usersRedux)

        let arrUsers = this.state.usersRedux
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromparent={this.toggleUserModal}
                />
                {this.state.isOpenModalUserEdit &&
                    <ModalUserEdit
                        isOpen={this.state.isOpenModalUserEdit}
                        toggleFromparent={this.toggleUserModalEdit}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='title text-center'>
                    Quản lý người dùng
                </div>
                <div className='mx-1'>
                    <button
                        onClick={() => { this.handleAddNewUser() }}
                        className='btn-add mt-3'><i className="fas fa-plus"></i>Add new user</button>
                </div>
                <div className='user-table mt-3 mx-1'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>Firts name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => { this.handleEditUser(item) }}
                                        >Edit</button>
                                        <button className='btn-delete' type='submit'
                                            onClick={() => { this.handleDeleteUser(item) }}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })}



                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        viewAllUser: () => dispatch(actions.fetchAllUserStart()),
        deleteUser: (id) => dispatch(actions.deleteUserStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(viewUser);

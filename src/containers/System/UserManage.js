import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../../services/userService';
import './UserManage.scss'
import ModalUser from './ModalUser';


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}


class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        console.log('user from node ', response)
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            }, () => {
                console.log('check state user ', this.state.arrUsers)
            })
            console.log('check state user 1', this.state.arrUsers)
        }
        console.log('user from node', response)
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

    render() {
        console.log('check render', this.state)
        let arrUsers = this.state.arrUsers
        return (
            <>
                <div className="users-container">
                    <ModalUser
                        isOpen={this.state.isOpenModalUser}
                        toggleFromparent={this.toggleUserModal}

                    />
                    <div className='title text-center'>
                        users manager
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
                                <th>last name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'>Edit</button>
                                            <button className='btn-delete'>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </table>
                    </div>
                </div>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

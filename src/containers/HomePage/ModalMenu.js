import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ModalMenu.scss'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
class HomeHeader extends Component {


    toggle = () => {
        this.props.toggleFromparent()
    }
    render() {
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


                                <Button color="secondary"
                                    onClick={() => { this.toggle() }}>
                                    Cancel
                                </Button>
                            </div>

                        </div>
                    </div>
                </ModalBody>

            </Modal >

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
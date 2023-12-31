import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import viewUser from '../containers/System/Admin/viewUser';
import manageDoctor from '../containers/System/Admin/mangeDoctor'
import Header from '../containers/Header/Header';
import SpecialtyManage from '../containers/Patient/Specialty/SpecialtyManage';
import ClinicManage from '../containers/Patient/Clinic/ClinicManage';

class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {this.props.isLoggedIn && <Header />}
                < div className="system-container" >
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/view-user" component={viewUser} />
                            <Route path="/system/specialty-manage" component={SpecialtyManage} />
                            <Route path="/system/clinic-manage" component={ClinicManage} />
                            <Route path="/system/doctor-manage" component={manageDoctor} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div >
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);

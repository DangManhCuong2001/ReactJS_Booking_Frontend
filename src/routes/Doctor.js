import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import scheduleManage from '../containers/System/Doctor/scheduleManage';
import specialityManage from '../containers/System/Doctor/specialityManage';


class Doctor extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {this.props.isLoggedIn && <Header />}
                < div className="Doctor-container" >
                    <div className="Doctor-list">
                        <Switch>
                            <Route path="/Doctor/schedule-manage" component={scheduleManage} />
                            <Route path="/Doctor/speciality-manage" component={specialityManage} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);

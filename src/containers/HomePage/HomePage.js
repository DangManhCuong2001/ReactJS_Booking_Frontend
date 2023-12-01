import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Banner from './Banner';
import Download from './Secstion/Download';
import Footer from './Secstion/Footer';
import Footer2 from './Secstion/Footer2';
import ChuyenKhoa from './Secstion/ChuyenKhoa';
import CosoYte from './Secstion/CosoYte';
import TuXa from './Secstion/TuXa';
import BacSi from './Secstion/BacSi';

class HomePage extends Component {


    render() {

        return (
            <>
                <HomeHeader />

                <Banner />
                <BacSi />
                <TuXa />
                <ChuyenKhoa />
                
                <CosoYte />
                


                <Download />
                <Footer />
                <Footer2 />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
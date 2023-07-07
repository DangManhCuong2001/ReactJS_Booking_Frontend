import React from "react";
import './Footer2.scss';

class Footer2 extends React.Component {
    render() {
        return (
            <div className="Footer2">
                <div className="Footer2-trai">
                    © 2023 BookingCare.
                </div>
                <div className="Footer2-phai">
                    <div className="fb"><i className="fab fa-facebook-square"></i></div>
                    <div className="youtube"><i className="fab fa-youtube"></i></div>
                </div>
            </div >
        )
    }
}

export default Footer2;
import React from "react";
import './CosoYte.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";


class CosoYte extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: []

        }
    }
    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data
            })
        }
    }

    // handleInfoClinic = (item) => {
    //     this.props.history.push(`/info-clinic/${item.id}`)
    // }

    render() {
        let { dataClinic } = this.state
        console.log('state', this.state)
        let settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div className="section-CosoYte">
                <div className="content-CosoYte">
                    <div className="title-CosoYte">
                        <div>Cơ sở y tế nổi bật</div>
                        <button className="button button1">TÌM KIẾM</button>
                    </div>
                    <Slider {...settings}>
                        {dataClinic && dataClinic.length > 0
                            && dataClinic.map((item, index) => {
                                return (
                                    <div className="img-CosoYte" key={index}
                                    // onClick={() => { this.handleInfoClinic(item) }}
                                    >
                                        <div className="background-img"
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        ></div>
                                        <div>{item.name}</div>
                                    </div>
                                )
                            })}
                    </Slider>
                </div>
            </div>
        )
    }
}

export default CosoYte;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import CommonUtils from '../../../utils/CommonUtils';
import './ClinicManage.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ClinicManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: "",
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    componentDidMount() {

    }



    componentDidUpdate(prevProps, prevState, snapshot) {


    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }

    handleChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleSaveClinic = async () => {
        let res = await createNewClinic(this.state)
        if (res && res.errCode === 0) {
            toast.success('Them phong kham thanh cong')
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        } else {
            toast.error('Them phòng khám that bai')
        }
    }

    render() {
        // console.log('state all d', this.state)
        return (
            <div className="specialty-manage-container">
                <div className='title text-center'>
                    Quản lý phòng khám
                </div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên bệnh viện</label>
                        <input className='form-control'
                            value={this.state.name}
                            onChange={(event) => { this.handleOnChangeInput(event, 'name') }}
                        ></input>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Tải ảnh lên</label>
                        <input className='form-control'
                            type='file'
                            onChange={(event) => { this.handleChangeImage(event) }}
                        ></input>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Địa chỉ</label>
                        <input className='form-control'
                            value={this.state.address}
                            onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                        ></input>
                    </div>
                    <div className='col-12 manage-specialty-editor'>
                        <MdEditor style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty'
                            onClick={() => this.handleSaveClinic()}
                        >Lưu</button>
                    </div>
                </div >
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage);

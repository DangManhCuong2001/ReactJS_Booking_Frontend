import axios from "../axios";

const handleLogin = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}
const createUserService = (data) => {
    return axios.post(`/api/create-new-user`, data);
}

const editUserService = (inputData) => {
    return axios.put(`/api/edit-user`, inputData)
}
const deleteUserService = (userId) => {

    return axios.delete(`/api/delete-user`, {
        data: {
            id: userId
        }
    });
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`);
}

const saveInfoDoctorService = (data) => {
    return axios.post(`/api/save-info-doctors`, data);
}

const getInfoDoctorService = (inputId) => {
    return axios.get(`/api/get-info-doctors?id=${inputId}`);
}

const saveBulkSchedule = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
}

const getScheduleDoctors = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctors?doctorId=${doctorId}&date=${date}`);
}

const getExtraInfoDoctors = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctors?doctorId=${doctorId}`);
}

const getProfileDoctors = (doctorId) => {
    return axios.get(`/api/get-profile-doctors?doctorId=${doctorId}`);
}

const saveBookSchedule = (data) => {
    return axios.post(`/api/bulk-book-schedule`, data);
}

const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`);
}

const getInfoSpecialById = (data) => {
    return axios.get(`/api/get-info-specialty-by-id?id=${data.id}&location=${data.location}`);
}

const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data);
}

const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`);
}

const getInfoClinicById = (data) => {
    return axios.get(`/api/get-info-clinic-by-id?id=${data.id}&location=${data.location}`);
}


export {
    handleLogin, getAllUsers, getAllCodeService, getAllDoctorsService,
    createUserService, deleteUserService, editUserService,
    getTopDoctorHomeService, saveInfoDoctorService,
    getInfoDoctorService, saveBulkSchedule, getScheduleDoctors,
    getAllSpecialty, getInfoSpecialById,
    getExtraInfoDoctors, getProfileDoctors, saveBookSchedule,
    createNewSpecialty, createNewClinic, getAllClinic,
    getInfoClinicById

}


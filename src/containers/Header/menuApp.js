export const adminMenu = [
    { //quan ly nguoi dung
        name: 'He thong',
        menus: [
            {
                name: 'Quản lý người dùng', link: '/system/view-user',
            },
            {
                name: 'Quản lý Bác sĩ', link: '/system/doctor-manage',

            },
            {
                name: 'Quản lý kế hoạch khám', link: '/doctor/schedule-manage',
            },
        ]
    },
    { //quan ly phnog kham
        name: 'Phòng khám', menus: [
            {
                name: 'Quản lý phòng khám', link: '/system/clinic-manage',
            },
        ]
    },
    { //chuyen khoa
        name: 'Chuyên khoa', menus: [
            {
                name: 'Quản lý chuyên khoa', link: '/system/specialty-manage',
            },
        ]
    },
    { //cam nang
        name: 'Cẩm nang', menus: [
            {
                name: 'Quản lý cẩm nang',
                subMenus: [

                ]
            },
        ]
    },
];

export const doctorMenu = [
    { //quan ly nguoi dung
        name: 'Hệ thống',
        menus: [
            {
                name: 'Quản lý kế hoạch khám', link: '/doctor/schedule-manage',
            },
        ]
    },
];
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const weblink = `datacenter.com`

const online = `https://amsly.netlify.app`
const local = `http://localhost:5173`

export const refLink = (user) => {
    return `${online}/register/${user}`
}

export const ToastAlert = (val) => {
    return toast.success(val, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

export const ErrorAlert = (val) => {
    return toast.error(val, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

export const SwalAlert = (title, text, icon) => {
    return Swal.fire({
        title,
        text,
        icon,
        showConfirmButton: false
    })
}

export const Services = [
    "data",
    "airtime vtu",
    "airtime Sns",
    "cable",
    "data pin",
    "airtime pin",
    "exam",
    "electricity"
]

export const Autos = [
    {
        category: 'data',
        title: `set data automation`,
        url: `/auth/admin/automation/data`
    },
    {
        category: 'airtime',
        title: `set airtime automation`,
        url: `/auth/admin/automation/airtime`
    },
    {
        category: 'cable',
        title: `set cable tv automation`,
        url: `/auth/admin/automation/cable`
    },
    // {
    //     category: 'data pin',
    //     title: `set airtime share automation`,
    // url: `/auth/admin/automation/data`
    // },
    // {
    //     category: 'airtime pin',
    //     title: ``,
    // url: `/auth/admin/automation/data`
    // },
    {
        category: 'exam',
        title: `set exam automation`,
        url: `/auth/admin/automation/exam`
    },
    {
        category: 'electricity',
        title: `set electricity bill automation`,
        url: `/auth/admin/automation/electricity`
    },
]
export const ServicesLinks = [
    {
        title: 'data',
        link: '/auth/admin/lock-data'
    },
    {
        title: 'airtime',
        link: '/auth/admin/lock-airtime'
    },
    {
        title: 'cable',
        link: '/auth/admin/lock-cables'
    },
    {
        title: 'data pin',
        link: ''
    },
    {
        title: 'airtime pin',
        link: ''
    },
    {
        title: 'exam',
        link: '/auth/admin/lock-exam'
    },
    {
        title: 'bulk sms',
        link: ''
    },
    {
        title: 'electricity',
        link: '/auth/admin/lock-electricity'
    },
]


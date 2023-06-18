import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const weblink = `datacenter.com`

export const ToastAlert = (val) => {
    return toast(val, {
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
    },
    {
        category: 'cable',
        title: `set cable tv automation`,
    },
    // {
    //     category: 'data pin',
    //     title: `set airtime share automation`,
    // },
    // {
    //     category: 'airtime pin',
    //     title: ``,
    // },
    {
        category: 'exam',
        title: `set exam automation`,
    },
    {
        category: 'electricity',
        title: `set electricity bill automation`,
    },
]
export const ServicesLinks = [
    {
        title: 'data',
        link: '/auth/admin/lock-data'
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
        link: ''
    },
    {
        title: 'bulk sms',
        link: ''
    },
    {
        title: 'electricity',
        link: ''
    },
]


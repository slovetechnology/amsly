import React, { useState } from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import { FaArrowRight } from 'react-icons/fa'
import { Api, PostUrl } from '../../../Components/Utils/Apis'
import { SwalAlert, ToastAlert } from '../../../Components/Utils/Utility'
import Loading from '../../../Components/General/Loading'

const AdminResetUserPin = () => {
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        email: '',
        pin: '',
        confirm_pin: ''
    })

    const handleForms = e => {
        setForms({...forms, [e.target.name]: e.target.value})
    }

    const handleSubmission = async () => {
        if(!forms.email) return ToastAlert('Email is required')
        if(!forms.pin) return ToastAlert('pin is required')
        if(!forms.confirm_pin) return ToastAlert('Confirm pin is required')
        if(forms.confirm_pin !== forms.pin) return ToastAlert('pin(s) do not match')

        const data = {
            ...forms
        }
        setLoading(true)
        const res = await PostUrl(Api.user.update_user_pin, data)
        setLoading(false)
        if(res.status === 200) {
            SwalAlert('Request Successful', res.msg, 'success')
            setForms({
                email: '',
                pin: '',
                confirm_pin: ''
            })
        }else {
            ToastAlert(res.msg)
        }
    }
    return (
        <AdminLayout pagetitle="Reset user pin">
            {loading && <Loading /> }
            <div className="w-11/12 mx-auto">
                <div className="bg-white rounded-lg mb-10 px-4 py-8">
                    <div className="mt-10">
                        <div className="mb-6">
                            <div className="text-zinc-600">user email address</div>
                            <input name="email" value={forms.email} onChange={handleForms} type="email" className="input" />
                        </div>
                        <div className="mb-6">
                            <div className="text-zinc-600">New User Pin</div>
                            <input maxLength={4} name="pin" value={forms.pin} onChange={handleForms} type="pin" className="input" />
                        </div>
                        <div className="mb-6">
                            <div className="text-zinc-600">Confirm User Pin</div>
                            <input maxLength={4} name="confirm_pin" value={forms.confirm_pin} onChange={handleForms} type="pin" className="input" />
                        </div>
                        <div className="w-11/12 mx-auto"><button onClick={handleSubmission} className="bg-indigo-600 rounded-lg w-full mt-5 py-3 uppercase text-white font-semibold flex items-center justify-center gap-10">reset pin <FaArrowRight /> </button></div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminResetUserPin
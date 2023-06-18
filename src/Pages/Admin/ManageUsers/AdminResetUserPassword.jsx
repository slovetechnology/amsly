import React, { useState } from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import { FaArrowRight } from 'react-icons/fa'
import { Api, PostUrl } from '../../../Components/Utils/Apis'
import { SwalAlert, ToastAlert } from '../../../Components/Utils/Utility'
import Loading from '../../../Components/General/Loading'

const AdminResetUserPassword = () => {
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        email: '',
        password: '',
        confirm_password: ''
    })

    const handleForms = e => {
        setForms({...forms, [e.target.name]: e.target.value})
    }

    const handleSubmission = async () => {
        if(!forms.email) return ToastAlert('Email is required')
        if(!forms.password) return ToastAlert('Password is required')
        if(!forms.confirm_password) return ToastAlert('Confirm Password is required')
        if(forms.confirm_password !== forms.password) return ToastAlert('password(s) do not match')

        const data = {
            ...forms
        }
        setLoading(true)
        const res = await PostUrl(Api.user.update_user_password, data)
        setLoading(false)
        if(res.status === 200) {
            SwalAlert('Request Successful', res.msg, 'success')
            setForms({
                email: '',
                password: '',
                confirm_password: ''
            })
        }else {
            ToastAlert(res.msg)
        }
    }
    return (
        <AdminLayout>
            {loading && <Loading /> }
            <div className="w-11/12 mx-auto">
                <div className="bg-white rounded-lg mb-10 px-4 py-8">
                    <div className="text-xl text-zinc-600 font-semibold uppercase">reset <span className="text-red-600">user password</span> </div>
                    <div className="mt-10">
                        <div className="mb-6">
                            <div className="text-zinc-600">user email address</div>
                            <input name="email" value={forms.email} onChange={handleForms} type="email" className="input" />
                        </div>
                        <div className="mb-6">
                            <div className="text-zinc-600">New User Password</div>
                            <input name="password" value={forms.password} onChange={handleForms} type="password" className="input" />
                        </div>
                        <div className="mb-6">
                            <div className="text-zinc-600">Confirm User password</div>
                            <input name="confirm_password" value={forms.confirm_password} onChange={handleForms} type="password" className="input" />
                        </div>
                        <div className="w-11/12 mx-auto"><button onClick={handleSubmission} className="bg-indigo-600 rounded-lg w-full mt-5 py-3 uppercase text-white font-semibold flex items-center justify-center gap-10">reset password <FaArrowRight /> </button></div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminResetUserPassword
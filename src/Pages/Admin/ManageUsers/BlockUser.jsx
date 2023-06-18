import React, { useState } from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import { FaArrowRight } from 'react-icons/fa'
import Loading from '../../../Components/General/Loading'
import {ToastAlert} from '../../../Components/Utils/Utility'
import { Api, PostUrl } from '../../../Components/Utils/Apis'

const BlockUser = () => {
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        email: '',
        status: '',
    })

    const handleForms = e => {
        setForms({...forms, [e.target.name]: e.target.value})
    }

    const handleSubmission = async () => {
        if(!forms.email) return ToastAlert('Email Address is required')
        if(!forms.status) return ToastAlert('Account Status is required')
        const data = {...forms}
        setLoading(true)
        const res = await PostUrl(Api.user.block_account, data)
        setLoading(false)
        if(res.status === 200) {
            ToastAlert(res.msg)
            setForms({
                email: '',
                status: ''
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
                    <div className="text-xl text-zinc-600 font-semibold uppercase">Block / Unblock <span className="text-red-600">user Account</span> </div>
                    <div className="mt-10">
                        <div className="mb-6">
                            <div className="text-zinc-600">user email address</div>
                            <input name="email" value={forms.email} onChange={handleForms} type="email" className="input" />
                        </div>
                        <div className="mb-6">
                            <div className="text-zinc-600">Select Operation</div>
                            <select name="status" value={forms.status} onChange={handleForms} className="input">
                                <option value="">--Select--</option>
                                <option value="yes">Block Account</option>
                                <option value="no">UnBlock Account</option>
                            </select>
                        </div>
                        <div onClick={handleSubmission} className="w-11/12 mx-auto"><button className="bg-indigo-600 rounded-lg w-full mt-5 py-3 uppercase text-white font-semibold flex items-center justify-center gap-10">search <FaArrowRight /> </button></div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default BlockUser
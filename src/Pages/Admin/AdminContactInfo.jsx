import React, { useCallback, useEffect, useState } from 'react'
import AdminLayout from '../../Components/Admin/AdminLayout'
import { FaArrowRight } from 'react-icons/fa'
import { SwalAlert, ToastAlert } from '../../Components/Utils/Utility'
import Loading from '../../Components/General/Loading'
import { Api, GetUrl, PostUrl } from '../../Components/Utils/Apis'

const AdminContactInfo = () => {
    const [loading, setLoading] = useState(false)
    const [contact, setContact] = useState({})
    const [forms, setForms] = useState({
        mobile: '',
        address: '',
        email: '',
        facebook: '',
        whatsapp: '',
        twitter: '',
        instagra: '',
        linkedin: '',
    })
    const handleForms = e => {
        setForms({ ...forms, [e.target.name]: e.target.value })
    }

    const fetchContactInfo = useCallback(async () => {
        const res = await GetUrl(Api.user.get_contact_info)
        if (res.status === 200) {
            const item = res.msg
            setForms({
                mobile: item.mobile,
                address: item.address,
                email: item.email,
                facebook: item.facebook,
                whatsapp: item.whatsapp,
                twitter: item.twitter,
                instagra: item.instagram,
                linkedin: item.linkedin,
            })
        }
    }, [])

    useEffect(() => {
        fetchContactInfo()
    }, [fetchContactInfo])

    const handleSubmission = async () => {
        if (!forms.mobile) return ToastAlert('contact number is required')
        if (!forms.address) return ToastAlert('contact official address is required')
        if (!forms.email) return ToastAlert('contact email address is required')
        const data = {
            ...forms
        }
        setLoading(true)
        const res = await PostUrl(Api.user.contact_info, data)
        setLoading(false)
        if (res.status === 200) {
            return SwalAlert('Request Successful', res.msg, 'success')
        } else {
            ToastAlert(res.msg)
        }
    }
    return (
        <AdminLayout>
            {loading && <Loading />}
            <div className="w-11/12 mx-auto">
                <div className="bg-white rounded-lg mb-10 px-4 py-8">
                    <div className="text-xl text-zinc-600 font-semibold uppercase">update your <span className="text-red-600"> contact information</span> </div>
                    <div className="bg-orange-50 p-3 text-orange-800 rounded-lg text-sm">This is the information that will be shown to your users to contact you </div>
                    <div className="mt-10">
                        <div className="mb-6">
                            <div className="text-zinc-600">Mobile Number</div>
                            <input name="mobile" value={forms.mobile} onChange={handleForms} type="number" className="input" />
                        </div>
                        <div className="mb-6">
                            <div className="text-zinc-600">Biz Address</div>
                            <textarea name="address" value={forms.address} onChange={handleForms} cols="30" rows="3" className='input'></textarea>
                        </div>
                        <div className="mb-6">
                            <div className="text-zinc-600">Email Address</div>
                            <input name="email" value={forms.email} onChange={handleForms} type="email" className="input" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="mb-6">
                                <div className="text-zinc-600">Facebook Handle (optional) </div>
                                <input name="facebook" value={forms.facebook} onChange={handleForms} type="text" className="input" />
                            </div>
                            <div className="mb-6">
                                <div className="text-zinc-600">Whatsapp Handle (optional) </div>
                                <input name="whatsapp" value={forms.whatsapp} onChange={handleForms} type="text" className="input" />
                            </div>
                            <div className="mb-6">
                                <div className="text-zinc-600">Twitter Handle (optional) </div>
                                <input name="twitter" value={forms.twitter} onChange={handleForms} type="text" className="input" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="mb-6">
                                <div className="text-zinc-600">Instagram Handle (optional) </div>
                                <input name="instagram" value={forms.instagram} onChange={handleForms} type="text" className="input" />
                            </div>
                            <div className="mb-6">
                                <div className="text-zinc-600">LinkedIn Handle (optional) </div>
                                <input name="linkedin" value={forms.linkedin} onChange={handleForms} type="text" className="input" />
                            </div>
                        </div>
                        <div className="w-11/12 mx-auto"><button onClick={handleSubmission} className="bg-indigo-600 rounded-lg w-full mt-5 py-3 uppercase text-white font-semibold flex items-center justify-center gap-10">Update contact information <FaArrowRight /> </button></div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminContactInfo
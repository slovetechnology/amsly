import { PostUrl } from '/src/Components/Utils/Apis'
import Loading from '/src/Components/General/Loading'
import { Api, UpdateUrl } from '/src/Components/Utils/Apis'
import { ErrorAlert, SwalAlert } from '/src/Components/Utils/Utility'
import React, { useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const NotifyForm = ({ notify }) => {
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        message: notify?.message || '',
        tag: notify?.tag || ''
    })
    const handleForms = e => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        if (!forms.message) return SwalAlert('Request Failed', `Enter a valid message`, 'error')
        if (!forms.tag) return SwalAlert('Request Failed', `Enter a valid position`, 'error')
        let formid = {};
        if (notify?.id) { formid = { id: notify.id } } else { formid = {} }
        setLoading(true)
        const data = {
            ...forms,
            ...formid
        }
        try {
            const res = formid?.id ? await UpdateUrl(Api.notify.update_notify, data) : await PostUrl(Api.notify.create_notify, data)
            if (res.status === 200) {
                SwalAlert('Request Successfull', `${res.msg}`, 'success')
            } else {
                SwalAlert('Request failed', `${res.msg}`, 'error')
            }
        } catch (error) {
            ErrorAlert(`${error}`)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <div className="">
                {loading && <Loading />}
                <div className="w-11/12 mx-auto">
                    <div className="">
                        <Link to={`/auth/admin/manage_notification`} className='text-blue-600 flex items-center gap-1 mb-6'> <FaArrowLeft className='text-sm' /> Back</Link>
                    </div>
                    <div className="bg-white rounded-lg mb-10 px-4 py-8">
                        <div className="text-xl text-zinc-600 font-semibold uppercase">Manage<span className="text-red-600"> Notification</span> </div>
                        <div className="mt-10">
                            {!notify?.id && <div className="mb-6">
                                <div className="text-zinc-600">Specify position</div>
                                <select name="tag" value={forms.tag} onChange={handleForms} className="input">
                                    <option value="">--Select--</option>
                                    <option value="first">First</option>
                                    <option value="second">Second</option>
                                    <option value="third">Third</option>
                                </select>
                            </div>}
                            <div className="mb-6">
                                <div className="text-zinc-600">Notification</div>
                                <textarea cols="30" rows="5" name="message" value={forms.message} onChange={handleForms} className="input" placeholder='Enter Message....'></textarea>
                            </div>
                            <div className="w-fit ml-auto"><button onClick={handleSubmit} className="bg-indigo-600 rounded-lg w-full mt-5 py-3 px-6 text-sm uppercase text-white font-semibold flex items-center justify-center gap-10">manage Notification <FaArrowRight /> </button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotifyForm
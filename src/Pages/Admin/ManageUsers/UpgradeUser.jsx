import React, { useCallback, useEffect, useState } from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import { FaArrowRight } from 'react-icons/fa'
import { Api, GetUrl } from '/src/Components/Utils/Apis'
import { ErrorAlert } from '/src/Components/Utils/Utility'
import Loading from '/src/Components/General/Loading'
import { PostUrl } from '/src/Components/Utils/Apis'
import { ToastAlert } from '/src/Components/Utils/Utility'

const UpgradeUser = () => {
    const [levels, setLevels] = useState([])
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        email: '',
        level: ''
    })

    const handleForms = e => {
        setForms({
            ...forms, 
            [e.target.name]: e.target.value
        })
    }

    const fetchLevels = useCallback(async() => {
        const res = await GetUrl(Api.subs.all_levels)
        if(res.status === 200) return setLevels(res.msg)
    }, [])

    useEffect(() => {fetchLevels()}, [fetchLevels])

    const handleSubmission = async () => {
        if(!forms.email) return ErrorAlert('Provide a valid Email Address')
        if(!forms.level) return ErrorAlert('Select a level')

        setLoading(true)
        const res = await PostUrl(Api.subs.upgrade_user_level, forms)
        setLoading(false)
        if(res.status === 200) {
            ToastAlert(res.msg)
            setForms({
                email: '',
                level: ''
            })
        }else {
            return ErrorAlert(res.msg)
        }
    }
    return (
        <AdminLayout pagetitle="Upgrade User Account">
            {loading && <Loading /> }
            <div className="w-11/12 mx-auto">
                <div className="bg-white rounded-lg mb-10 px-4 py-8">
                    <div className="mt-10">
                        <div className="mb-6">
                            <div className="text-zinc-600">user email address</div>
                            <input type="email" name="email" onChange={handleForms} value={forms.email} className="input" />
                        </div>
                        <div className="mb-6">
                            <div className="text-zinc-600">Select Operation</div>
                            <select name="level" onChange={handleForms} value={forms.level} className="input">
                                <option value="">--Select--</option>
                                {levels.length > 0 && levels.map((item, i) => (
                                    <option key={i} value={item.id}>{item.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-11/12 mx-auto"><button onClick={handleSubmission} className="bg-indigo-600 rounded-lg w-full mt-5 py-3 capitalize text-white font-semibold flex items-center justify-center gap-10">upgrade <FaArrowRight /> </button></div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default UpgradeUser
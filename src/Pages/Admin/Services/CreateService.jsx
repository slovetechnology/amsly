import React, { useState } from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import { ErrorAlert, Services, SwalAlert, ToastAlert } from '../../../Components/Utils/Utility'
import { ToastContainer } from 'react-toastify'
import Loading from '../../../Components/General/Loading'
import { Api, PostUrl } from '../../../Components/Utils/Apis'

const CreateService = () => {
    const [packs, setPacks] = useState([])
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        network: '',
        category: '',
        tag: '',
        title: '',
        price: '',
        percent: '',
    })

    const handleForms = e => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }
    const addPackages = () => {
        if (!forms.title) return ErrorAlert('title is required')
        if (!forms.price) return ErrorAlert('price is required')
        setPacks([...packs, { title: forms.title, price: forms.price }])
        setForms({
            ...forms,
            title: '',
            price: '',
        })
    }

    const handleSubmission = async () => {
        if (!forms.network) return ErrorAlert('network is required')
        if (packs.length < 1) return ErrorAlert('Service package required')
        const data = {
            network: forms.network,
            category: forms.category,
            tag: forms.tag,
            percent: forms.percent,
            packages: [...packs]
        }
        setLoading(true)
        const res = await PostUrl(Api.subs.create_subscription, data)
        setLoading(false)
        if (res.status === 200) {
            setForms({ ...forms, 
                network: '',
                category: '',
                tag: '',
                percent: ''
            })
            setPacks([])
            SwalAlert('Request Success', res.msg, 'success')
        } else {
            SwalAlert('Request Failure', res.msg, 'error')
        }
    }
    return (
        <AdminLayout>
            {loading && <Loading />}
            <div className="">
                <div className="bg-white rounded-lg">
                    <div className="border-b p-3">
                        <div className="mb-3">
                            <div className="">Service Network Category (Optional)</div>
                            <select name="tag" value={forms.tag} onChange={handleForms} className="input uppercase">
                                <option value="">--Select--</option>
                                <option value="mtn">mtn</option>
                                <option value="airtel">airtel</option>
                                <option value="glo">glo</option>
                                <option value="etisalat">etisalat</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <div className="">Name of Service</div>
                            <input name="network" value={forms.network} onChange={handleForms} type="text" placeholder='--Service Name--' className="input" />
                        </div>
                        <div className="mb-3">
                            <div className="">category of Service</div>
                            <select name="category" value={forms.category} onChange={handleForms} className="input uppercase">
                                <option value="">--Select--</option>
                                {Services.map((item, i) => (
                                    <option value={item} key={i}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <div className="">Set Percentage (Optional) </div>
                            <input name="percent" value={forms.percent} onChange={handleForms} type="text" placeholder='--Percentage--' className="input" />
                        </div>
                    </div>
                    <div className="p-3">
                        <div className="mb-3 pb-2 px-3">Service Packages</div>
                        <div className="grid grid-cols-3 gap-5 border-t border-b p-3">
                            <div className="">
                                <div className="">Package Title</div>
                                <input name="title" value={forms.title} onChange={handleForms} type="text" placeholder='--Title--' className="input" />
                            </div>
                            <div className="">
                                <div className="">Package Price</div>
                                <input name="price" value={forms.price} onChange={handleForms} type="number" placeholder='--Price--' className="input" />
                            </div>
                            <div className="self-center">
                                <button onClick={addPackages} className="bg-indigo-600 py-2.5 px-4 mt-5 text-sm text-white rounded-lg capitalize">add</button>
                            </div>
                        </div>
                        <div className="p-3">
                            {packs.length > 0 ? packs.map((item, i) => (
                                <div className="py-2.5 border-b last:border-b-0 px-2" key={i}>
                                    <div className="grid grid-cols-2">
                                        <div className="text-sm">{item.title}</div>
                                        <div className="text-right text-sm"> &#8358; {item.price}</div>
                                    </div>
                                </div>
                            )) :
                                <div className="text-center text-slate-500 py-3">No Package Service added yet!.</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="w-fit ml-auto mt-10">
                    <button onClick={handleSubmission} className="bg-indigo-600 py-4 rounded-full px-6 text-white capitalize">create subscription</button>
                </div>
            </div>
            <ToastContainer />
        </AdminLayout>
    )
}

export default CreateService
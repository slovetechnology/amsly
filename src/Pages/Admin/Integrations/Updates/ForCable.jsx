

import React, { useState } from 'react'
import SingleApiNetwork from '../SingleApiNetwork'
import { ToastAlert, SwalAlert } from '/src/Components/Utils/Utility'
import Loading from '/src/Components/General/Loading'
import { Api, PostUrl } from '/src/Components/Utils/Apis'

const ForCable = ({ data, cables }) => {
    const [isNew, setIsNew] = useState(true)
    const [works, setWorks] = useState(cables?.cabnetworks || [])
    const [loading, setLoading] = useState(false)
    const [packid, setpackid] = useState('')
    const [forms, setForms] = useState({
        serviceName: cables?.serviceName || '',
        decoderName: cables?.decoderName || '',
        planName: cables?.planName || '',
        method: cables?.method || '',
        format: cables?.format || '',
    })

    const [networks, setNetworks] = useState({
        title: '',
        tag: '',
        nets: 'cable',
    })
    const handleNetworks = e => {
        setNetworks({
            ...networks,
            [e.target.name]: e.target.value,
        })
    }


    const handleForms = e => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }

    const handleNetworksDeleting = (id) => {
        const findPoint = works.filter((item) => item.id !== id)
        setWorks(findPoint)
    }
    const handleNetworksUpdating = (value) => {
        setIsNew(false)
        setpackid(value.id)
        setNetworks({
            title: value.title,
            tag: value.tag || '',
            nets: 'cable',
        })
    }

    const handleAddNetworks = () => {
        if (!data.token) return ToastAlert('Provide a valid api url')
        if (!networks.title) return ToastAlert('Provide a valid api network for user to see')
        if (!networks.tag) return ToastAlert('Provide a valid api network for api providers to see')

        if (isNew) {
            const findData = works.find(item => (item.title === networks.title && item.nets === networks.nets))
            if (findData) return ToastAlert(`Network already exists!`)
            const date = new Date()
            const pointData = {
                id: date.getTime(),
                title: networks.title,
                tag: networks.tag,
                nets: 'cable',
            }
            setWorks([...works, pointData])
        } else {
            const findPack = works.find(item => item.id === packid)
            if (findPack) {
                const mappedWorks = works.map((item) => {
                    if (item.id === packid) {
                        return {
                            ...item,
                            title: networks.title,
                            tag: networks.tag,
                            nets: 'cable',
                        }
                    }
                    return item
                })
                setWorks(mappedWorks)
            }
        }
        setNetworks({
            nets: 'cable',
            title: '',
            tag: '',
        })
        setIsNew(true)
    }

    const handleSubmission = async () => {
        if (!forms.method) return ToastAlert('Integration Method is required')
        if (!forms.format) return ToastAlert('Integration Format is required')
        if (!forms.serviceName) return ToastAlert('Service Name is required')
        if (!forms.decoderName) return ToastAlert('Decoder Name is required')
        if (!forms.planName) return ToastAlert('Plan Name is required')

        const formdata = {
            ...forms,
            networks: works,
            automation: data.id
        }

        setLoading(true)
        const res = await PostUrl(Api.subs.add_cable_automation, formdata)
        setLoading(false)
        if(res.status === 200) {
            SwalAlert('Request Successful', res.msg, 'success')
        }else {
            SwalAlert('Request Failed', res.msg, 'error')
        }
    }

    return (
        <div className=''>
            {loading && <Loading /> }
            <div className="w-full bg-white p-4">
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="mb-4">
                            <div className="text-slate-500">Token</div>
                            <input readOnly defaultValue={data.token} type="text" className="input bg-slate-200" />
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Method</div>
                            <select name="method" value={forms.method} onChange={handleForms} className="input">
                                <option value="">--Select--</option>
                                <option value="GET">GET</option>
                                <option value="POST">POST</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Format</div>
                            <select name="format" value={forms.format} onChange={handleForms} className="input">
                                <option value="">--Select--</option>
                                <option value="HEAD">HEAD</option>
                                <option value="BODY">BODY</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Service Name</div>
                            <input name="serviceName" value={forms.serviceName} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Decoder Name</div>
                            <input name="decoderName" value={forms.decoderName} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Plan Name</div>
                            <input name="planName" value={forms.planName} onChange={handleForms} type="text" className="input" />
                        </div>
                    </div>

                    <div className="">
                        <div className="mt-2 mb-3 text-indigo-600">Enter Api Networks</div>
                        <div className="flex items-center gap-5">
                            <div className="w-full">
                                <input name="title" placeholder='--MY WEBSITE--' value={networks.title} onChange={handleNetworks} type="text" className="input" />
                            </div>
                            <div className="w-full">
                                <input name="tag" placeholder='--SOURCE ID--' value={networks.tag} onChange={handleNetworks} type="text" className="input" />
                            </div>
                            <button type="button" onClick={handleAddNetworks} className="bg-indigo-600 rounded-lg text-sm w-fit capitalize text-white py-2 px-4">{isNew ? 'save' : 'update'}</button>
                        </div>
                        <div className="mt-2 mb-3 text-indigo-600 border-b">Networks Summary</div>
                        {works.length > 0 ? works.map((item, i) => (
                           item.nets === 'cable' && <SingleApiNetwork
                                item={item}
                                key={i}
                                handleNetworksDeleting={handleNetworksDeleting}
                                handleNetworksUpdating={handleNetworksUpdating}
                            />
                        )) : <div className="text-center text-slate-500 text-sm">No Network found yet</div>}
                    </div>
                </div>
                <div className="p-4 w-fit ml-auto">
                    <button onClick={handleSubmission} className="bg-indigo-600 py-3 uppercase px-6 rounded-full text-white">integrate cable Api</button>
                </div>
            </div>
        </div>
    )
}

export default ForCable
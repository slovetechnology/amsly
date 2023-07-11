import React, { useState } from 'react'
import SingleApiNetwork from '../SingleApiNetwork'
import { ToastAlert, SwalAlert } from '/src/Components/Utils/Utility'
import Loading from '/src/Components/General/Loading'
import { Api, PostUrl } from '/src/Components/Utils/Apis'

const ForAirtime = ({ data, allworks, airtimes }) => {
    const [isNew, setIsNew] = useState(true)
    const [works, setWorks] = useState(allworks || [])
    const [loading, setLoading] = useState(false)
    const [packid, setpackid] = useState('')
    const [forms, setForms] = useState({
        mobileName: airtimes?.mobileName || '',
        networkName: airtimes?.networkName || '',
        amountName: airtimes?.amountName || '',
        refName: airtimes?.refName || '',
        method: airtimes?.method || '',
        format: airtimes?.format || '',
    })

    const [networks, setNetworks] = useState({
        title: '',
        tag: '',
        nets: 'airtime',
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
            nets: 'airtime',
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
                nets: 'airtime',
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
                            nets: 'airtime',
                        }
                    }
                    return item
                })
                setWorks(mappedWorks)
            }
        }
        setNetworks({
            nets: 'airtime',
            title: '',
            tag: '',
        })
        setIsNew(true)
    }

    const handleSubmission = async () => {
        if (!forms.method) return ToastAlert('Integration Method is required')
        if (!forms.format) return ToastAlert('Integration Format is required')
        if (!forms.mobileName) return ToastAlert('Mobile Name is required')
        if (!forms.networkName) return ToastAlert('Network Name is required')
        if (!forms.amountName) return ToastAlert('Amount Name is required')
        if (!forms.refName) return ToastAlert('reference Name is required')

        const formdata = {
            ...forms,
            networks: works,
            automation: data.id
        }

        setLoading(true)
        const res = await PostUrl(Api.subs.add_airtime_automation, formdata)
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
                            <div className="text-slate-500">Mobile Name</div>
                            <input name="mobileName" value={forms.mobileName} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Network Name</div>
                            <input name="networkName" value={forms.networkName} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Amount Name</div>
                            <input name="amountName" value={forms.amountName} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Reference Name</div>
                            <input name="refName" value={forms.refName} onChange={handleForms} type="text" className="input" />
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
                           item.nets === 'airtime' && <SingleApiNetwork
                                item={item}
                                key={i}
                                handleNetworksDeleting={handleNetworksDeleting}
                                handleNetworksUpdating={handleNetworksUpdating}
                            />
                        )) : <div className="text-center text-slate-500 text-sm">No Network found yet</div>}
                    </div>
                </div>
                <div className="p-4 w-fit ml-auto">
                    <button onClick={handleSubmission} className="bg-indigo-600 py-3 uppercase px-6 rounded-full text-white">integrate airtime Api</button>
                </div>
            </div>
        </div>
    )
}

export default ForAirtime
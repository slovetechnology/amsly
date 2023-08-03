import React, { useState } from 'react'
import AdminLayout from '../../../Components/Admin/AdminLayout'
import { SwalAlert, ToastAlert } from '../../../Components/Utils/Utility'
import { Api, PostUrl } from '../../../Components/Utils/Apis'
import Loading from '../../../Components/General/Loading'
import spins from '../../../Assets/Images/spins.gif'
import { ImCompass } from 'react-icons/im'
import { SlTrash } from 'react-icons/sl'

const CreateAutomation = () => {
    const [loading, setLoading] = useState(false)
    const [spiner, setSpiner] = useState(false)
    const [endpoints, setEndpoints] = useState([])
    const [works, setWorks] = useState([])
    const [points, setPoints] = useState({
        point: '',
        category: ''
    })
    const [networks, setNetworks] = useState({
        title: '',
        nets: 'data',
        tag: '',
    })
    const [forms, setForms] = useState({
        apiurl: '',
        title: '',
        token: '',
        method: '',
        format: '',
        refid: '',
        callback: '',
        planName: '',
        mobileName: '',
        portedNumber: '',
        portedName: '',
        refName: '',
        networkName: '',
        tokenName: '',
        callbackName: '',
        auths: 'no',
    })

    const handleForms = e => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value,
        })
    }
    const handlePoints = e => {
        setPoints({
            ...points,
            [e.target.name]: e.target.value,
        })
    }
    const handleNetworks = e => {
        setNetworks({
            ...networks,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmission = async e => {
        e.preventDefault()
        if (!forms.title) return ToastAlert('Name of service is required')
        if (!forms.apiurl) return ToastAlert('Api Url is required')
        if (!forms.token) return ToastAlert('Api Token is required')
        if (!forms.tokenName) return ToastAlert('Token Name is required')
        if (!forms.method) return ToastAlert('Api Method is required')
        if (!forms.format) return ToastAlert('Api Format is required')
        if (!forms.planName) return ToastAlert('Api Plan Name is required')
        if (!forms.mobileName) return ToastAlert('Mobile ID is required')
        if (endpoints.length < 1) return ToastAlert('Endpoints to the api url is required')
        if (works.length < 1) return ToastAlert('Networks to the api url is required')

        const formdata = {
            ...forms,
            endpoints: endpoints,
            networks: works
        }
        setLoading(true)
        const res = await PostUrl(Api.subs.add_subscription_service, formdata)
        setLoading(false)
        if (res.status === 200) {
            SwalAlert('Request Successful', res.msg, 'success')
        } else {
            ToastAlert(res.msg)
        }
    }
    const generateRefID = () => {
        setSpiner(true)
        const rand = `REF${Math.floor(Math.random() * 186940303) * 854932}${Math.random().toString(36).substring(2, 16).toUpperCase()}ID`
        setTimeout(() => {
            setSpiner(false)
            setForms({ ...forms, refid: rand })
        }, 2000);
    }
    const handleEndpoints = () => {
        if (!forms.apiurl) return ToastAlert('Provide a valid api url')
        if (!points.category) return ToastAlert('Provide a valid api endpoint category')
        if (!points.point) return ToastAlert('Provide a valid api endpoint')
        const findData = endpoints.find(item => item.category === points.category)
        if(findData) return ToastAlert(`Endpoint with category "${points.category}" already exists!`)
        const date = new Date()
        const pointData = {
            id: date.getTime(),
            title: points.point,
            category: points.category
        }
        setEndpoints([...endpoints, pointData])
        setPoints({
            point: '',
            category: ''
        })
    }
    const handleAddNetworks = () => {
        if (!forms.apiurl) return ToastAlert('Provide a valid api url')
        if (!networks.title) return ToastAlert('Provide a valid api network for user to see')
        if (!networks.tag) return ToastAlert('Provide a valid api network for api providers to see')
        const findData = works.find(item => item.title === networks.title)
        if(findData) return ToastAlert(`Network already exists!`)
        const date = new Date()
        const pointData = {
            id: date.getTime(),
            title: networks.title,
            tag: networks.tag,
            nets: 'data',
        }
        setWorks([...works, pointData])
        setNetworks({
            nets: 'data',
            title: '',
            tag: '',
        })
    }

    const handleEndpointsDelete = id => {
        const findPoint = endpoints.filter((item) => item.id !== id)
        setEndpoints(findPoint)
    }
    const handleNetworksDeleting = id => {
        const findPoint = works.filter((item) => item.id !== id)
        setWorks(findPoint)
    }
    return (
        <AdminLayout pagetitle="Add Integration Service">
            {loading && <Loading />}

            <form onSubmit={handleSubmission}>
                <div className="w-full bg-white p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="mb-4">
                            <div className="text-slate-500">Service Name</div>
                            <input name="title" value={forms.title} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Api Url</div>
                            <input name="apiurl" value={forms.apiurl} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Api Token</div>
                            <input name="token" value={forms.token} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Token Name</div>
                            <input name="tokenName" value={forms.tokenName} onChange={handleForms} type="text" className="input" />
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
                            <div className="text-slate-500">Plan Name</div>
                            <input name="planName" value={forms.planName} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Reference ID  (optional)</div>
                            <div className="flex items-center gap-5">
                                <input name="refid" value={forms.refid} onChange={handleForms} type="text" className="input" />
                                <button type='button' onClick={generateRefID} className="bg-indigo-600 flex items-center justify-center capitalize text-white rounded-lg text-xs h-10 w-24"> {spiner ? <img src={spins} alt="" className="w-11" /> : 'generate'} </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Mobile Name</div>
                            <input name="mobileName" value={forms.mobileName} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Reference Name (Optional)</div>
                            <input name="refName" value={forms.refName} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Network Name</div>
                            <input name="networkName" value={forms.networkName} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Ported Name (optional)</div>
                            <input name="portedName" value={forms.portedName} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Ported Number (optional)</div>
                            <input name="portedNumber" value={forms.portedNumber} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Callback Name (Optional)</div>
                            <input name="callbackName" value={forms.callbackName} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Callback URL (Optional)</div>
                            <input name="callback" value={forms.callback} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="text-slate-500">Authorization (Optional)</div>
                            <select name="auths" value={forms.auths} onChange={handleForms} className="input">
                                <option value="no">NO</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 border-t gap-4 lg:grid-cols-2">
                        <div className="">
                            <div className="mt-2 mb-3 text-indigo-600">Enter Api Endpoints</div>
                            <div className="flex items-center gap-5 w-11/12">
                                <div className="">
                                    <input name="category" placeholder='--category--' value={points.category} onChange={handlePoints} type="text" className="input" />
                                </div>
                                <div className="">
                                    <input name="point" placeholder='--Endpoint--' value={points.point} onChange={handlePoints} type="text" className="input" />
                                </div>
                                <button type="button" onClick={handleEndpoints} className="bg-indigo-600 rounded-lg text-sm w-fit capitalize text-white py-2 px-4">add</button>
                            </div>
                            <div className="mt-2 mb-3 text-indigo-600 border-b">Apis Summary</div>
                            {endpoints.length > 0 ? endpoints.map((item, i) => (
                                <div className="grid grid-cols-2 p-1.5 border-b" key={i}>
                                    <div className="text-sm flex items-center gap-3"> <ImCompass /> {forms.apiurl}{item.title}</div>
                                    <div onClick={() => handleEndpointsDelete(item.id)} className="cursor-pointer w-fit ml-auto text-red-600"> <SlTrash /> </div>
                                </div>
                            )) : <div className="text-center text-slate-500 text-sm">No Endpoints found yet</div>}
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
                                <button type="button" onClick={handleAddNetworks} className="bg-indigo-600 rounded-lg text-sm w-fit capitalize text-white py-2 px-4">save</button>
                            </div>
                            <div className="mt-2 mb-3 text-indigo-600 border-b">Networks Summary</div>
                            {works.length > 0 ? works.map((item, i) => (
                                <div className="grid grid-cols-4 p-1.5 border-b" key={i}>
                                    {/* <div className="text-sm flex items-center gap-3"> <ImCompass /> {item.title}</div> */}
                                    <div className="col-span-3">
                                        <div className="grid grid-cols-2">
                                            <div className="text-xs">User Will See:</div>
                                            <div className="text-xs text-right">{item.title}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="text-xs">Service Provider Will See:</div>
                                            <div className="text-xs text-right">{item.tag}</div>
                                        </div>
                                    </div>
                                    <div onClick={() => handleNetworksDeleting(item.id)} className="cursor-pointer col-span-1 w-fit ml-auto text-red-600"> <SlTrash /> </div>
                                </div>
                            )) : <div className="text-center text-slate-500 text-sm">No Network found yet</div>}
                        </div>
                    </div>
                </div>
                <div className="p-4 w-fit ml-auto">
                    <button className="bg-indigo-600 py-3 uppercase px-6 rounded-full text-white">integrate Api</button>
                </div>
            </form>
        </AdminLayout>
    )
}

export default CreateAutomation
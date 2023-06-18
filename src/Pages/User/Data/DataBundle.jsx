import React, { useCallback, useEffect, useState } from 'react'
import UserLayout from '../../../Components/User/UserLayout'
import ContactToAdmin from '../ContactToAdmin'
import { Link } from 'react-router-dom'
import { Api, AuthPost, GetUrl, PostUrl } from '../../../Components/Utils/Apis'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { ToastAlert } from '../../../Components/Utils/Utility'
import axios from 'axios'

const DataBundle = () => {
    const { subs, subdata } = useSelector(state => state.data)
    const [, setSinglesub] = useState(null)
    const [datas, setDatas] = useState([])
    const [targets, setTargets] = useState([])
    const [forms, setForms] = useState({
        service: '',
        network: '',
        package: '',
        mobile: '',
        pin: ''
    })

    const handleForms = e => {
        setForms({ ...forms, [e.target.name]: e.target.value })
    }
    const handleSubs = e => {
        const id = e.target.value
        if (id) {
            setSinglesub(id)
            setForms({
                ...forms,
                network: id
            })
            const filter = subdata.filter((item) => item.network === parseInt(id))
            setDatas(filter)
        }
    }
    const handleSubsNetwork = e => {
        const tag = e.target.value
        if (tag) {
            setForms({
                ...forms,
                service: tag
            })
            const filter = subs.filter((item) => item.tag === tag)
            setTargets(filter)
        }
    }
    const handleSubmission = async (e) => {
        e.preventDefault()
        try {
            const formdata = {
                ...forms
            }
            const res = await PostUrl(Api.bills.data, formdata)
            if (res.status === 200) {
                // start formatting data binding
                const url = res.url
                const formformat = res.msg
                const autos = res.autos
                console.log(url, formformat, 'from the backend response')
                // if(autos.method === "GET" && autos.format === 'BODY') {
                const result = await AuthPost(url, formformat)
                console.log(result, 'result from api')
                // }
            } else {
                ToastAlert(res.msg);
            }
        } catch (error) {
            return console.log(error)
        }
    }

    const handleDuplicates = () => {
        const unique2 = subs.filter((obj, index) => {
            return index === subs.findIndex(o => obj.tag === o.tag);
        });
        return (<>
            <select name="network" onChange={handleSubsNetwork} className="input uppercase">
                <option value="">--Select--</option>
                {unique2.map((item, i) => (
                    item.category === 'data' && item.locked === 'no' && <option key={i} value={item.tag}>{item.tag}</option>
                ))}
            </select>
        </>)
    }
    return (
        <>
            <div className="mt-10">
                <div className="bg-white w-full max-w-3xl p-5 shadow-xl mx-auto rounded-lg">
                    <form onSubmit={handleSubmission}>
                        <div className="mb-4">
                            <div className="capitalize">Choose Network Coverage</div>
                            {handleDuplicates()}
                        </div>
                        <div className="mb-4">
                            <div className="capitalize">Choose Service</div>
                            <select name="network" onChange={handleSubs} className="input uppercase">
                                <option value="">--Select--</option>
                                {targets.map((item, i) => (
                                    item.category === 'data' && item.locked === 'no' && <option key={i} value={item.id}>{item.network}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <div className="capitalize">Choose Package </div>
                            <select name="package" onChange={handleForms} className="input uppercase">
                                <option value="">--Select--</option>
                                {datas.map((item, i) => (
                                    <option key={i} value={item.id}>{item.title} = &#8358;{item.price}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <div className="capitalize"> Mobile No. </div>
                            <input name="mobile" value={forms.mobile} onChange={handleForms} type="number" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="grid grid-cols-2">
                                <div className="capitalize">transaction pin  </div>
                                <div className="text-right">Don't have! <Link to='/create_pin' className='text-indigo-600'>Create Pin</Link> </div>
                            </div>
                            <input maxLength={4} name="pin" value={forms.pin} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="w-fit ml-auto">
                            <button className="bg-indigo-600 capitalize rounded-full py-3 px-8 text-white">purchase</button>
                        </div>
                        <ContactToAdmin />
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default DataBundle
import React, { useState } from 'react'
import ContactToAdmin from '../ContactToAdmin'
import { Link, useNavigate } from 'react-router-dom'
import { Api, PostUrl, GetUrl } from '/src/Components/Utils/Apis'
import { useDispatch, useSelector } from 'react-redux'
import { SwalAlert, ToastAlert } from '/src/Components/Utils/Utility'
import Loading from '/src/Components/General/Loading'
import { dispatchUser } from '/src/app/reducer'
import ConfirmDataPurchase from './Compos/ConfirmDataPurchase'
import { ErrorAlert } from '/src/Components/Utils/Utility'
import PerformTractionNotice from './Compos/PerformTractionNotice'

const DataBundle = () => {
    const { subs, subdata } = useSelector(state => state.data)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [, setSinglesub] = useState(null)
    const [datas, setDatas] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [view, setView] = useState(false)
    const [targets, setTargets] = useState([])
    const [autos, setAutos] = useState([])
    const [forms, setForms] = useState({
        service: '',
        network: '',
        mobile: '',
        pin: ''
    })
    const [packdata, setpackdata] = useState('')

    const handleForms = e => {
        setForms({ ...forms, [e.target.name]: e.target.value })
    }
    const handleFormsPackage = async e => {
        const val = e.target.value
        setpackdata(val)
        const res = await GetUrl(`${Api.subs.user_get_automation}/${val}`)
        if (res.status === 200) return setAutos(res.msg)
    }
    const handleSubs = e => {
        const id = e.target.value
        setpackdata('')
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
        setDatas([])
        setpackdata('')
        if (tag) {
            setForms({
                ...forms,
                service: tag
            })
            const filter = subs.filter((item) => item.tag === tag)
            setTargets(filter)
        }
    }
    const ConfirmSubmission = (e) => {
        e.preventDefault()
        if(!forms.service) return ErrorAlert('Select a network service carrier')
        if(!forms.network) return ErrorAlert('Select a network')
        if(!packdata) return ErrorAlert('Select a suscription package')
        if(!forms.mobile) return ErrorAlert('Enter a valid phone number')
        if(!forms.pin) return ErrorAlert('Provide your data pin')
        setView(!view)
    }
    const handleSubmission = async () => {
        try {
            const formdata = {
                ...forms,
                package: packdata
            }
            setLoading(true)
            const res = await PostUrl(Api.bills.data, formdata)
            setLoading(false)
            if (res.status === 200) {
                dispatch(dispatchUser(res.user))
                setView(!view)
                setOpen(!open)
            } else {
                ErrorAlert(res.msg);
            }
        } catch (error) {
            return ErrorAlert(error)
        }
    }

    const handleDuplicates = () => {
        const unique2 = subs.filter((obj, index) => {
            return index === subs.findIndex(o => obj.tag === o.tag);
        });
        return (<>
            <select name="network" onChange={handleSubsNetwork} className="input uppercase">
                <option>--Select--</option>
                {unique2.map((item, i) => (
                    item.category === 'data' && item.locked === 'no' && <option key={i} value={item.tag}>{item.tag}</option>
                ))}
            </select>
        </>)
    }
    return (
        <>
            {loading && <Loading />}
           {open && <PerformTractionNotice />}
            {view && <ConfirmDataPurchase handleSubmission={handleSubmission} closeView={() => setView(!view)} /> }
            <div className="mt-10">
                <div className="bg-white w-full max-w-3xl p-5 shadow-xl mx-auto rounded-lg">
                    <ContactToAdmin />
                    <form onSubmit={ConfirmSubmission}>
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
                            <select name="package" value={packdata} onChange={handleFormsPackage} className="input uppercase">
                                <option value="">--Select--</option>
                                {datas.map((item, i) => (
                                   item.lock === 'no' &&  <option key={i} value={item.id}>{item.title} = &#8358;{item.price}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <div className="capitalize"> Mobile No. </div>
                            <input name="mobile" value={forms.mobile} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="grid grid-cols-2">
                                <div className="capitalize">transaction pin  </div>
                                <div className="text-right">Don't have! <Link to='/create_pin' className='text-indigo-600'>Create Pin</Link> </div>
                            </div>
                            <input maxLength={4} name="pin" value={forms.pin} onChange={handleForms} type="password" className="input" />
                        </div>
                        <div className="w-fit ml-auto">
                            <button className="bg-indigo-600 capitalize rounded-full py-3 px-8 text-white">purchase</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default DataBundle
import React, { useEffect, useState } from 'react'
import UserLayout from '../../../Components/User/UserLayout'
import ContactToAdmin from '../ContactToAdmin'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '/src/Components/General/Loading'
import ConfirmAirtimePurchase from './Compos/ConfirmAirtimePurchase'
import { ErrorAlert } from '/src/Components/Utils/Utility'
import { Api, PostUrl } from '/src/Components/Utils/Apis'
import { dispatchUser } from '/src/app/reducer'
import PerformTractionNotice from './Compos/PerformTractionNotice'

const AirtimeBills = () => {
    const { subs } = useSelector(state => state.data)
    const [mainsub, setMainsub] = useState({})
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [view, setView] = useState(false)
    const [packs, setPacks] = useState([])
    const [forms, setForms] = useState({
        network: '',
        amount: '',
        mobile: '',
        pin: '',
        sub: ''
    })
    const handleForms = e => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }

    const handleMainSub = (e) => {
        const id = e.target.value
        const findData = subs.find((item) => item.id?.toString() === id)
        setMainsub(findData?.sub[0])
        setForms({
            ...forms,
            sub: id,
            network: findData?.sub[0]?.id
        })
    }

    const ConfirmSubmission = e => {
        e.preventDefault()
        if (!forms.network) return ErrorAlert('Select your preferred network')
        if (!forms.amount) return ErrorAlert('Subscription Amount required')
        if (!forms.mobile) return ErrorAlert('Mobile Number required')
        if (!forms.pin) return ErrorAlert('Airtime Pin required')
        setView(!view)
    }

    const handleSubmission = async () => {
        try {
            const formdata = {
                ...forms
            }
            setLoading(true)
            const res = await PostUrl(Api.bills.airtime, formdata)
            setLoading(false)
            if (res.status === 200) {
                setOpen(!open)
                dispatch(dispatchUser(res.user))
                setView(!view)
            } else {
                ErrorAlert(res.msg);
            }
        } catch (error) {
            return ErrorAlert(error)
        }
    }
    return (
        <UserLayout pagetitle="buy your airtime VTU">
        {open && <PerformTractionNotice />}
            {loading && <Loading />}
            {view && <ConfirmAirtimePurchase handleSubmission={handleSubmission} closeView={() => setView(!view)} />}
            <div className="mt-10">
                <div className="bg-white w-full max-w-3xl p-5 shadow-xl mx-auto rounded-lg">
                    <form onSubmit={ConfirmSubmission}>
                        <div className="mb-4">
                            <div className="capitalize">Choose Network</div>
                            <select name="network" onChange={handleMainSub} className="input">
                                <option value="">--Select--</option>
                                {subs?.length > 0 && subs.map((item, i) => (
                                   item.category.endsWith('-vtu') && item.locked === 'no' &&  <option key={i} value={item.id}>{item.network.split(' ')[0]}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <div className="capitalize">recharge amount </div>
                            <input name="amount" value={forms.amount} onChange={handleForms} type="number" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="capitalize">mobile number </div>
                            <input name="mobile" value={forms.mobile} onChange={handleForms} type="number" className="input" />
                        </div>
                        <div className="mb-4">
                            <div className="grid grid-cols-2">
                                <div className="capitalize">transaction pin  </div>
                                <div className="text-right">Don't have! <Link to='/create_pin' className='text-indigo-600'>Create Pin</Link> </div>
                            </div>
                            <input name="pin" value={forms.pin} maxLength={4} onChange={handleForms} type="text" className="input" />
                        </div>
                        <div className="w-fit ml-auto">
                            <button className="bg-indigo-600 capitalize rounded-full py-3 px-8 text-white">make payment</button>
                        </div>
                        <ContactToAdmin />
                    </form>
                </div>
            </div>
        </UserLayout>
    )
}

export default AirtimeBills
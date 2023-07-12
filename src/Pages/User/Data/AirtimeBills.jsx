import React, { useEffect, useState } from 'react'
import UserLayout from '../../../Components/User/UserLayout'
import ContactToAdmin from '../ContactToAdmin'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastAlert } from '/src/Components/Utils/Utility'
import Loading from '/src/Components/General/Loading'
import ConfirmAirtimePurchase from './Compos/ConfirmAirtimePurchase'

const AirtimeBills = () => {
    const { subs } = useSelector(state => state.data)
    const [mainsub, setMainsub] = useState({})
    const [loading, setLoading] = useState(false)
    const [view, setView] = useState(false)
    const [packs, setPacks] = useState([])
    const [forms, setForms] = useState({
        network: '',
        amount: '',
        mobile: '',
        pin: ''
    })
    const handleForms = e => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const findData = subs.find((item) => item.category.endsWith('-vtu'))
        setMainsub(findData)
        setPacks(findData?.sub)
    }, [])

    const ConfirmSubmission = e => {
        e.preventDefault()
        if (!forms.network) return ToastAlert('Select your preferred network')
        if (!forms.amount) return ToastAlert('Subscription Amount required')
        if (!forms.mobile) return ToastAlert('Mobile Number required')
        if (!forms.pin) return ToastAlert('Airtime Pin required')
        setView(!view)
    }

    const handleSubmission = async () => {
        const formdata = {
            ...forms,
            sub: mainsub.id
        }
        console.log(formdata)
    }
    return (
        <UserLayout pagetitle="buy your airtime VTU">
            {loading && <Loading />}
            {view && <ConfirmAirtimePurchase handleSubmission={handleSubmission} closeView={() => setView(!view)} />}
            <div className="mt-10">
                <div className="bg-white w-full max-w-3xl p-5 shadow-xl mx-auto rounded-lg">
                    <form onSubmit={ConfirmSubmission}>
                        <div className="mb-4">
                            <div className="capitalize">Choose Network</div>
                            <select name="network" value={forms.network} onChange={handleForms} className="input">
                                <option value="">--Select--</option>
                                {packs?.length > 0 && packs.map((item, i) => (
                                    <option key={i} value={item.id}>{item.title}</option>
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
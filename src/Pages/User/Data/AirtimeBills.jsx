import React, { useEffect, useState } from 'react'
import UserLayout from '../../../Components/User/UserLayout'
import ContactToAdmin from '../ContactToAdmin'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '/src/Components/General/Loading'
import ConfirmAirtimePurchase from './Compos/ConfirmAirtimePurchase'
import { ErrorAlert } from '/src/Components/Utils/Utility'
import { Api, PostUrl } from '/src/Components/Utils/Apis'

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
        console.log(findData, subs, 'data founded!--')
        setMainsub(findData)
        setPacks(findData?.sub)
    }, [])

    const ConfirmSubmission = e => {
        e.preventDefault()
        if (!forms.network) return ErrorAlert('Select your preferred network')
        if (!forms.amount) return ErrorAlert('Subscription Amount required')
        if (!forms.mobile) return ErrorAlert('Mobile Number required')
        if (!forms.pin) return ErrorAlert('Airtime Pin required')
        setView(!view)
    }

    const handleSubmission = async () => {
        const formdata = {
            ...forms,
            sub: mainsub.id
        }
        setLoading(true)
        const res = await PostUrl(Api.bills.airtime, formdata)
        setLoading(false)
        console.log(res)
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
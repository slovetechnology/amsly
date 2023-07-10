import React, { useState } from 'react'
import UserLayout from '../../../Components/User/UserLayout'
import ContactToAdmin from '../ContactToAdmin'
import { SwalAlert, ToastAlert } from '../../../Components/Utils/Utility'
import { Api, PostUrl } from '../../../Components/Utils/Apis'
import Loading from '../../../Components/General/Loading'
import { useDispatch } from 'react-redux'
import { dispatchUser } from '../../../app/reducer'

const CreatePin = ({sendSignal}) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [forms, setForms] = useState({
        pin: '',
        confirm_pin: ''
    })
    const handleForms = e => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }

    const pinSubmission = async e => {
        e.preventDefault()
        if(!forms.pin) return ToastAlert('Enter a valid pin')
        if(!forms.confirm_pin) return ToastAlert('Confirm pin')
        if(forms.confirm_pin !== forms.pin) return ToastAlert('Validation Error: pin(s) not matched')
        if(forms.pin.length < 4) return ToastAlert('Pin must be at least 4 characters long')
        if(forms.confirm_pin.length < 4) return ToastAlert('Confirm pin must be at least 4 characters long')

        const data = {
            pin: forms.pin,
            confirm_pin: forms.confirm_pin
        }

        setLoading(true)
        const res = await PostUrl(Api.user.create_transaction_pin, data)
        setLoading(false)
        if(res.status === 200) {
            sendSignal()
            dispatch(dispatchUser(res.user))
            return SwalAlert('Request Successful', res.msg, 'success')
        }else {
            return SwalAlert('Request Failed', res.msg, 'error')
        }
    }
    return (
        <>
        {loading && <Loading /> }
            <div className="">
                <div className="bg-white mt-10 rounded-lg p-3 w-full max-w-3xl mx-auto">
                    <div className="border-b p-3 mb-5 text-lg">Create Transaction PIN to <span className="text-indigo-600">secure your wallet.</span> </div>
                    <form onSubmit={pinSubmission}>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="mb-4">
                                <div className="">Enter your New 4 Digit Pin</div>
                                <input name="pin" value={forms.pin} onChange={handleForms} maxLength={4} type="text" className="input" />
                            </div>
                            <div className="mb-4">
                                <div className="">Confirm Pin</div>
                                <input name="confirm_pin" value={forms.confirm_pin} onChange={handleForms} maxLength={4} type="text" className="input" />
                            </div>
                            <div className="w-fit ml-auto">
                                <button className="bg-indigo-600 uppercase text-white rounded-full py-3.5 px-7">create pin</button>
                            </div>
                        </div>
                    </form>
                    <ContactToAdmin />
                </div>
            </div>
        </>
    )
}

export default CreatePin
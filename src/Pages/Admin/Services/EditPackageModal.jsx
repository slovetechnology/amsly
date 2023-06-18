import React, { useState } from 'react'
import ModalLayout from '../../../Components/Utils/ModalLayout'
import { ToastAlert } from '../../../Components/Utils/Utility'
import { Api, PostUrl } from '../../../Components/Utils/Apis'
import Loading from '../../../Components/General/Loading'

const EditPackageModal = ({ closeView, data, resendSignal }) => {
    const [loading, setLoading] = useState(false)
    const [forms, setForms] = useState({
        title: data.title,
        price: data.price
    })

    const handleForms = e => {
        setForms({...forms, [e.target.name]: e.target.value})
    }

    const EditPackages = async e => {
        e.preventDefault()
        if(!forms.title) return ToastAlert('Provide the title for this package')
        if(!forms.price) return ToastAlert('Provide the price for this package')
        const formdata = {
            ...forms,
            id: data.id,
        }
        setLoading(true)
        const res = await PostUrl(Api.subs.update_subscriptiondata, formdata)
        setLoading(false)

        if(res.status === 200) {
            resendSignal()
            closeView()
            ToastAlert(res.msg)
        }else {
            ToastAlert(res.msg)
        }
    }
    return (
        <ModalLayout closeView={closeView}>
            {loading && <Loading /> }
            <form>
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
                        <button onClick={EditPackages} className="bg-indigo-600 py-2.5 px-4 mt-5 text-sm text-white rounded-lg capitalize">add</button>
                    </div>
                </div>
            </form>
        </ModalLayout>
    )
}

export default EditPackageModal
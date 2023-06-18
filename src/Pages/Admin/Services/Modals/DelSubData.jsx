import React from 'react'
import ModalLayout from '../../../../Components/Utils/ModalLayout'
import { Api, PostUrl } from '../../../../Components/Utils/Apis'
import { ToastAlert } from '../../../../Components/Utils/Utility'

const DelSubData = ({ closeView, id, resendSignal}) => {
    const handleDeleting = async () => {
        const data = {
            id
        }
        const res = await PostUrl(Api.subs.delete_subscriptiondata, data)
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
            <div className="p-4">
                <div className="text-center">Are you sure you want to delete this package?!..</div>
                <div className="mt-10 w-2/5 mx-auto">
                    <button onClick={handleDeleting} className="bg-red-700 text-white rounded-full py-3 w-full capitalize">confirm action</button>
                </div>
            </div>
        </ModalLayout>
    )
}

export default DelSubData
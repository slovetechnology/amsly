import React, { useState } from 'react'
import ModalLayout from '/src/Components/Utils/ModalLayout'
import { Api, PostUrl } from '/src/Components/Utils/Apis'
import { ToastAlert } from '/src/Components/Utils/Utility'
import { useNavigate } from 'react-router-dom'
import Loading from '/src/Components/General/Loading'

const DeleteIntegration = ({ closeView, id, resendSignal}) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const handleDeleting = async () => {
        try {
            setLoading(true)
            const data = {
                id
            }
            const res = await PostUrl(Api.subs.delete_automation_service, data)
            setLoading(false)
            if(res.status === 200) {
                resendSignal()
                closeView()
                return ToastAlert(res.msg)
            }
        } catch (error) {
            return ToastAlert(error)
        }
    }
    return (
        <ModalLayout closeView={closeView}>
            {loading && <Loading />}
            <div className="p-4">
                <div className="text-center">Are you sure you want to delete this service?!..</div>
                <div className="mt-10 w-2/5 mx-auto">
                    <button onClick={handleDeleting} className="bg-red-700 text-white rounded-full py-3 w-full capitalize">confirm action</button>
                </div>
            </div>
        </ModalLayout>
    )
}

export default DeleteIntegration
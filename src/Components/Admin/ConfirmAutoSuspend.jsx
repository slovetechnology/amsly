
import React, { useState } from 'react'
import { Api, PostUrl } from '/src/Components/Utils/Apis'
import { ErrorAlert, ToastAlert } from '/src/Components/Utils/Utility'

const ConfirmAutoSuspend = ({tag, pack}) => {
    const [zone, setZone] = useState(1)
    const [loading, setLoading] = useState(false)

    const handleSubmission = async () => {
        const formdata = {
            tag,
            pack
        }
        setLoading(true)
        const res = await PostUrl(Api.subs.suspend_automation, formdata)
        setLoading(false)
        if(res.status === 200) {
            return ToastAlert(res.msg)
        }else {
            return ErrorAlert(res.msg)
        }
    }
    return (
        <div className='my-5 w-10/12'>
            {zone === 1 && <div className="flex items-center justify-end">
                <button onClick={() => setZone(2)} className="bg-blue-500 text-white rounded-md text-sm capitalize shadow-xl py-2.5 px-6">suspend</button>
            </div>}
            {zone === 2 &&  <>
            <div className="flex items-center justify-end gap-6">
                <button onClick={() => setZone(1)} className="bg-slate-500 text-white rounded-md text-sm capitalize shadow-xl py-2.5 px-6">cancel</button>
                <button onClick={handleSubmission} disabled={loading ? true : false} className={`${loading ? 'bg-red-300' : 'bg-red-500'} text-white rounded-md text-sm capitalize shadow-xl py-2.5 px-6`}>{loading ? 'running...' : 'proceed'}</button>
            </div>
            </>}
        </div>
    )
}

export default ConfirmAutoSuspend
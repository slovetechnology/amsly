

import React, { useState } from 'react'
import ModalLayout from '/src/Components/Utils/ModalLayout'
import { ToastAlert } from '/src/Components/Utils/Utility'
import { Api, PostUrl } from '/src/Components/Utils/Apis'
import { SlExclamation } from 'react-icons/sl'
import Loading from '/src/Components/General/Loading'
import ConfirmAutoSuspend from '/src/Components/Admin/ConfirmAutoSuspend'

const SetupCableMainAutomation = ({ data, closeView, resendSignal, net, allitems, tag }) => {
    const [plan, setPlan] = useState(false)
    const [planData, setPlanData] = useState('')
    const [loading, setLoading] = useState(false)
    const [automation, setAutomation] = useState('')

    const handleService = (e) => {
        setAutomation(e.target.value)
        const findData = data.find(item => item.id.toString() === e.target.value)
        setPlan(true)
        const findPlan = findData.cabplans.find((item) => item.pack === allitems.id)
        setPlanData(findPlan)

    }

    const saveChanges = async e => {
        e.preventDefault()
        if (!automation) return ToastAlert('Provide an automation service')
        if (!planData) return ToastAlert('Provide an automation service Data Price, to set the price, navigate to the api automation plans page')
        const formdata = {
            automation: automation,
            deal: planData.plan,
            id: allitems.id,
            tag: tag,
            nets: 1
        }
        setLoading(true)
        const res = await PostUrl(Api.subs.update_package_automation, formdata)
        setLoading(false)
        if (res.status === 200) {
            resendSignal()
            closeView()
            ToastAlert(res.msg)
        } else {
            ToastAlert(res.msg)
        }
    }

    return (
        <>
            {loading && <Loading />}
            <ModalLayout closeView={closeView}>
                <div className="bg-sky-50 p-3 text-xs">Setup {tag} automation service for <b>{`"${allitems.title}"`}</b> @ &#8358;{allitems.price} </div>
                <div className="p-4">
                <ConfirmAutoSuspend pack={allitems.id} tag={tag} />
                    <form onSubmit={saveChanges}>
                        <div className="mb-3">
                            <div className="">Select Automation</div>
                            <select onChange={handleService} className="input">
                                <option value="">--Select--</option>
                                {data?.length > 0 ? data.map((item, i) => <option value={item.id} key={i}>{item.title}</option>) : null}
                            </select>
                        </div>
                        {plan && <div>
                            <div className="mt-10 w-fit ml-auto">
                                <button className="bg-indigo-600 text-white capitalize rounded-full py-3 px-5 text-sm">save changes</button>
                            </div>
                        </div>}
                    </form>
                    <div className="mt-5">
                        <div className="p-2 text-red-900 text-sm bg-red-50 rounded-lg flex items-center gap-2"> <SlExclamation /> You can refresh your browser to see changes!.</div>
                    </div>
                </div>
            </ModalLayout>
        </>
    )
}

export default SetupCableMainAutomation
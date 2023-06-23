import React, { useState } from 'react'
import ModalLayout from '../../../Components/Utils/ModalLayout'
import { ToastAlert } from '../../../Components/Utils/Utility'
import { Api, PostUrl } from '../../../Components/Utils/Apis'
import { SlExclamation } from 'react-icons/sl'

const SetupMainAutomtion = ({ data, closeView, resendSignal, allitems, tag }) => {
    const [plan, setPlan] = useState(null)
    const [planData, setPlanData] = useState('')
    const [apis, setAPis] = useState([])
    const [automation, setAutomation] = useState('')
    const handleService = (e) => {
        setAutomation(e.target.value)
        const findData = data.find(item => item.id.toString() === e.target.value)
        const formated = `${findData.planName.split('_' || '-')[0]} ${findData.planName.split('_' || '-')[1]}`
        setPlan(formated)
        setAPis(findData.plans)
        const findPlan = findData.plans.find((item) => item.pack === allitems.id)
        setPlanData(findPlan)
    }

    const saveChanges = async e => {
        e.preventDefault()
        if (!automation) return ToastAlert('Provide an automation service')
        if (!planData) return ToastAlert('Provide an automation service Data Price')
        const formdata = {
            automation: automation,
            deal: planData.plan,
            id: allitems.id,
            tag: tag
        }
        
        const res = await PostUrl(Api.subs.update_package_automation, formdata)
        if (res.status === 200) {
            resendSignal()
            closeView()
            ToastAlert(res.msg)
        } else {
            ToastAlert(res.msg)
        }
    }
    return (
        <ModalLayout closeView={closeView}>
            <div className="bg-sky-50 p-3 text-xs">Setup {tag} automation service for &#8358;{allitems.price} </div>
            <div className="p-4">
                <form onSubmit={saveChanges}>
                    <div className="mb-3">
                        <div className="">Select Automation</div>
                        <select onChange={handleService} className="input">
                            <option value="">--Select--</option>
                            {data?.length > 0 ? data.map((item, i) => <option value={item.id} key={i}>{item.title}</option>) : null}
                        </select>
                    </div>
                    {plan ?
                        <div className="">
                            <div className="mt-10 w-fit ml-auto">
                                <button className="bg-indigo-600 text-white capitalize rounded-full py-3 px-5 text-sm">save changes</button>
                            </div>
                        </div>
                        : null}
                </form>
                <div className="mt-5">
                    <div className="p-2 text-red-900 text-sm bg-red-50 rounded-lg flex items-center gap-2"> <SlExclamation /> You can refresh your browser to see changes!.</div>
                </div>
            </div>
        </ModalLayout>
    )
}

export default SetupMainAutomtion